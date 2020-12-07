import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Currency } from './currencies.model';
import { CurrenciesService } from './currencies.service';

@Component({
  selector: 'app-all-currencies',
  templateUrl: './all-currencies.component.html',
  styleUrls: ['./all-currencies.component.scss']
})
export class AllCurrenciesComponent implements OnInit {

  currency: Currency;
  dataSource: CurrencyDataSource;

  displayedColumns = [
    'number',
    'currencyName',
    'actions'
  ]

  @ViewChild('input') input: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private currencyService: CurrenciesService) { }

  ngOnInit() {
    this.dataSource = new CurrencyDataSource(this.currencyService);
    this.dataSource.loadCurrencies();
  }

  refresh(){
    this.dataSource = new CurrencyDataSource(this.currencyService);
    this.input.nativeElement.value = '';
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.dataSource.loadCurrencies();
  }

  ngAfterViewInit(){
    //server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadCurrenciesPage();
        })
      )
      .subscribe()

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.paginator.page, this.sort.sortChange)
        .pipe(
          tap(() => this.loadCurrenciesPage())
        )
        .subscribe();
  }

  loadCurrenciesPage(){
    this.dataSource.loadCurrencies(
      this.paginator.pageSize,
      this.paginator.pageIndex,
      this.sort.active,
      this.sort.direction,
      this.input.nativeElement.value
    )
  }

  deleteItem(id){

  }

}

export class CurrencyDataSource implements DataSource<Currency>{
  private currencySubject = new BehaviorSubject<Currency[]>([]);

  constructor(private currencyService: CurrenciesService){}

  connect(collectionViewer: CollectionViewer): Observable<Currency[]> {
    return this.currencySubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.currencySubject.complete();
  }

  totalCount: number;

  loadCurrencies(pageSize = 10, pageIndex = 0, sortOrder = '', sortDirection = '', searchQuery = ''){
    this.currencyService.getAllCurrencies(pageSize, pageIndex += 1, sortOrder + '_' + sortDirection, searchQuery)
      .subscribe(
        currencies => {
          this.currencySubject.next(currencies.data),
          this.totalCount = currencies.totalCount
        }
      )
  }

}
