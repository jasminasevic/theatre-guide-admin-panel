import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Director } from '../all-directors/directors.model';
import { DirectorsService } from './directors.service';

@Component({
  selector: 'app-all-directors',
  templateUrl: './all-directors.component.html',
  styleUrls: ['./all-directors.component.sass']
})
export class AllDirectorsComponent implements OnInit {

  dataSource: DirectorDataSource;
  displayedColumns = [
    'no',
    'directorFirstName',
    'actions'
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private directorService: DirectorsService) { }

  ngOnInit() {
    this.dataSource = new DirectorDataSource(this.directorService);
    this.dataSource.loadDirectors();
  }

  refresh(){
    this.dataSource = new DirectorDataSource(this.directorService);
    this.input.nativeElement.value = '';
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.dataSource.loadDirectors();
  }

  ngAfterViewInit(){
    //server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadDirectorsPages();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        tap(() => this.loadDirectorsPages())
      )
      .subscribe();
  }

  loadDirectorsPages(){
    this.dataSource.loadDirectors(
      this.paginator.pageSize,
      this.paginator.pageIndex,
      this.sort.active,
      this.sort.direction,
      this.input.nativeElement.value
    )
  }

  deleteItem(){
  }

}

export class DirectorDataSource implements DataSource<Director>{

  private directorSubject = new BehaviorSubject<Director[]>([]);

  constructor(private directorService: DirectorsService){
  }

  connect(collectionViewer: CollectionViewer): Observable<Director[]> {
    return this.directorSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.directorSubject.complete();
  }

  totalCount: number;

  loadDirectors(pageSize = 10, pageIndex = 0, sortOrder = '', sortDirection = '', searchQuery = ''){
    this.directorService.getAllDirectors(pageSize, pageIndex += 1, sortOrder + '_' + sortDirection, searchQuery)
      .subscribe(
        directors => {
          this.directorSubject.next(directors.data);
          this.totalCount = directors.totalCount;
        });
  }
}
