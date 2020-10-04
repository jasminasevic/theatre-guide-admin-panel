import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Theatre } from './theatres.model';
import { TheatreService } from './theatres.service';

@Component({
  selector: 'app-all-theatres',
  templateUrl: './all-theatres.component.html',
  styleUrls: ['./all-theatres.component.scss']
})
export class AllTheatresComponent implements OnInit {

  theatre: Theatre;
  dataSource: TheatreDataSource;
  displayedColumns = [
    'name',
    'email',
    'address',
    'telephone',
    'description',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private theatresService: TheatreService) { }

  ngOnInit() {
    this.dataSource = new TheatreDataSource(this.theatresService);
    this.dataSource.loadTheatres();
  }

  refresh() {
    this.dataSource = new TheatreDataSource(this.theatresService);
    this.input.nativeElement.value = '';
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.dataSource.loadTheatres();
  }

  ngAfterViewInit(){
    //server-side search
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(()=> {
        this.paginator.pageIndex = 0;
        this.loadTheatresPage();
      })
    )
    .subscribe()

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
     merge(this.paginator.page, this.sort.sortChange)
        .pipe(
            tap(() => this.loadTheatresPage())
        )
        .subscribe();
  }

  loadTheatresPage() {
    this.dataSource.loadTheatres(
      this.paginator.pageSize,
      this.paginator.pageIndex,
      this.sort.active,
      this.sort.direction,
      this.input.nativeElement.value
       );
  }

  deleteItem(id){
    console.log(id);
  }

}

export class TheatreDataSource implements DataSource<Theatre>{
  private theatreSubject = new BehaviorSubject<Theatre[]>([]);

  constructor(private theatreService: TheatreService){}

  connect(collectionViewer: CollectionViewer): Observable<Theatre[]>{
    return this.theatreSubject.asObservable();
  }

  disconnect(collectionsViewer: CollectionViewer): void {
    this.theatreSubject.complete();
  }

  totalCount: number;

  loadTheatres(pageSize = 10, pageIndex = 0, sortOrder = '', sortDirection = '', searchQuery = ''){
    this.theatreService.getAllTheatres(pageSize, pageIndex += 1, sortOrder + '_' + sortDirection, searchQuery)
    // .pipe()
    .subscribe(
      theatres =>
      {
        this.theatreSubject.next(theatres.data);
        this.totalCount = theatres.totalCount;
      }
    )
  }


}
