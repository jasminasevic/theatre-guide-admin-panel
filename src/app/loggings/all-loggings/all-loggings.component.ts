import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Logging } from './logging.model';
import { LoggingsService } from './loggings.service';

@Component({
  selector: 'app-all-loggings',
  templateUrl: './all-loggings.component.html',
  styleUrls: ['./all-loggings.component.scss']
})
export class AllLoggingsComponent implements OnInit {

  logging: Logging;
  dataSource: LoggingDataSource;

  displayedColumns = [
    'no',
    'performer',
    'useCaseName',
    'loggingDate',
    'useCaseData'
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private loggingService: LoggingsService) { }

  ngOnInit() {
    this.dataSource = new LoggingDataSource(this.loggingService);
    this.dataSource.loadLoggings();
  }

  refresh(){
    this.dataSource = new LoggingDataSource(this.loggingService);
    this.input.nativeElement.value = '';
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.dataSource.loadLoggings();
  }

  ngAfterViewInit(){
    //server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0,
          this.loadLoggingPages()
        })
      )
      .subscribe()

      
     // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        tap(() =>
          this.loadLoggingPages())
      )
      .subscribe()
    }

  loadLoggingPages(){
    this.dataSource.loadLoggings(
      this.paginator.pageSize,
      this.paginator.pageIndex,
      this.sort.active,
      this.sort.direction,
      this.input.nativeElement.value
    );
  }

  convertObjectToString(obj){
    const parsedObject = JSON.parse(obj);
    let data: string = '\n';
    
    Object.entries(parsedObject)
      .forEach(([key, value]) => { data += key + ': ' + String(value) + "\n"});

    return data;
  }
}

  

export class LoggingDataSource implements DataSource<Logging>{
  private loggingSubject = new BehaviorSubject<Logging[]>([]);

  constructor(private loggingService: LoggingsService){}

  connect(collectionViewer: CollectionViewer): Observable<Logging[]> {
    return this.loggingSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.loggingSubject.complete();
  }

  totalCount: number;

  loadLoggings(pageSize = 10, pageIndex = 0, sortOrder = '', sortDirection = '', searchQuery = ''){
    this.loggingService.getAllLoggings(pageSize, pageIndex += 1, sortOrder + '_' + sortDirection, searchQuery)
      .subscribe(loggings => {
        this.loggingSubject.next(loggings.data),
        this.totalCount = loggings.totalCount
      })
  }

}
