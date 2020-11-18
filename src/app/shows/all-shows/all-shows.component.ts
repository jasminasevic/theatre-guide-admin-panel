import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Show } from './shows.model';
import { ShowsService } from './shows.service';

@Component({
  selector: 'app-all-shows',
  templateUrl: './all-shows.component.html',
  styleUrls: ['./all-shows.component.sass']
})
export class AllShowsComponent implements OnInit {

  show: Show;
  dataSource: ShowDataSource;

  displayedColumns = [
    'no',
    'title',
    'category',
    'theatre',
    'scene',
    'actions'
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private showService: ShowsService) { }

  ngOnInit() {
    this.dataSource = new ShowDataSource(this.showService);
    this.dataSource.loadShows();
  }

  refresh(){
    this.dataSource = new ShowDataSource(this.showService);
    this.input.nativeElement.value = '';
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.dataSource.loadShows();
  }

  ngAfterViewInit(){
    //server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() =>{
          this.paginator.pageIndex = 0,
          this.loadShowsPages()
        })
      )
      .subscribe()

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        tap(() => this.loadShowsPages())
      )
      .subscribe()
  }

  loadShowsPages(){
    this.dataSource.loadShows(
      this.paginator.pageSize,
      this.paginator.pageIndex,
      this.sort.active,
      this.sort.direction,
      this.input.nativeElement.value
    )
  }

  deleteItem(showId){

  }

}

export class ShowDataSource implements DataSource<Show>{
  private showSubject = new BehaviorSubject<Show[]>([]);

  constructor(private showService: ShowsService){}

  connect(collectionViewer: CollectionViewer): Observable<Show[]> {
    return this.showSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.showSubject.complete();
  }

  totalCount: number;

  loadShows(pageSize = 10, pageNumber = 0, sortOrder = '', sortDirection = '', searchQuery = ''){
    this.showService.getAllShows(pageSize, pageNumber +=1, sortOrder + '_' + sortDirection, searchQuery)
      .subscribe(show => {
        this.showSubject.next(show.data),
        this.totalCount = show.totalCount
      })
  }

}
