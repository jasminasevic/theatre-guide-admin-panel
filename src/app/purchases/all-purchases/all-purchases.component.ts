import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Purchase } from './purchases.model';
import { PurchasesService } from './purchases.service';

@Component({
  selector: 'app-all-purchases',
  templateUrl: './all-purchases.component.html',
  styleUrls: ['./all-purchases.component.scss']
})
export class AllPurchasesComponent implements OnInit {

  purchase: Purchase;
  dataSource: PurchaseDataSource;

  displayedColumns = [
    'no',
    'title',
    'theatre',
    'date',
    'time',
    'user',
    'actions'
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private purchaseService: PurchasesService) { }

  ngOnInit() {
    this.dataSource = new PurchaseDataSource(this.purchaseService);
    this.dataSource.loadPurchases();
  }

  refresh(){
    this.dataSource = new PurchaseDataSource(this.purchaseService);
    this.input.nativeElement.value = '';
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.dataSource.loadPurchases();
  }

  ngAfterViewInit(){
    //server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0,
          this.loadPurchasePages()
        })
      )
      .subscribe()

     // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        tap(() => this.loadPurchasePages())
      )
  }

  loadPurchasePages(){
    this.dataSource.loadPurchases(
      this.paginator.pageSize,
      this.paginator.pageIndex,
      this.sort.active,
      this.sort.direction,
      this.input.nativeElement.value
    );
  }

}

export class PurchaseDataSource implements DataSource<Purchase>{
  private purchaseSubject = new BehaviorSubject<Purchase[]>([]);

  constructor(private purchaseService: PurchasesService){}

  connect(collectionViewer: CollectionViewer): Observable<Purchase[]> {
    return this.purchaseSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.purchaseSubject.complete();
  }

  totalCount: number;

  loadPurchases(pageSize = 10, pageIndex = 0, sortOrder = '', sortDirection = '', searchQuery = ''){
    this.purchaseService.getAllPurchases(pageSize, pageIndex += 1, sortOrder + '_' + sortDirection, searchQuery)
      .subscribe(purchases => {
        this.purchaseSubject.next(purchases.data),
        this.totalCount = purchases.totalCount
      });
  }
}
