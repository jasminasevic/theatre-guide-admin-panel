import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Actor } from './actors.model';
import { ActorsService } from './actors.service';

@Component({
  selector: 'app-all-actors',
  templateUrl: './all-actors.component.html',
  styleUrls: ['./all-actors.component.scss']
})

export class AllActorsComponent implements OnInit {

  actor: Actor;
  dataSource: ActorDataSource;
  displayedColumns = [
    'no',
    'actorFirstName',
    'actions'
  ]

  @ViewChild('input') input: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private actorService: ActorsService) { }

  ngOnInit() {
    this.dataSource = new ActorDataSource(this.actorService);
    this.dataSource.loadActors();
  }

  refresh(){
    this.dataSource = new ActorDataSource(this.actorService);
    this.input.nativeElement.value = '';
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.dataSource.loadActors();
  }

  ngAfterViewInit(){
    //server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
          tap(() =>{
            this.paginator.pageIndex = 0;
            this.loadActorsPages();
          })
      )
      .subscribe();

      // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      // on sort or paginate events, load a new page
      merge(this.paginator.page, this.sort.sortChange)
        .pipe(
          tap(() => this.loadActorsPages())
        )
        .subscribe();
  }

  loadActorsPages(){
    this.dataSource.loadActors(
      this.paginator.pageSize,
      this.paginator.pageIndex,
      this.sort.active,
      this.sort.direction,
      this.input.nativeElement.value
    )
  }


  deleteItem(actorId){
  }


}

export class ActorDataSource implements DataSource<Actor>{

  private actorSubject = new BehaviorSubject<Actor[]>([]);
  constructor(private actorService: ActorsService){}

  connect(collectionViewer: CollectionViewer): Observable<Actor[]> {
    return this.actorSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.actorSubject.complete();
  }

  totalCount: number;

  loadActors(pageSize = 10, pageIndex = 0, sortOrder = '', sortDirection = 'asc', searchQuery = ''){
    this.actorService.getAllActors(pageSize, pageIndex += 1, sortOrder + '_' + sortDirection, searchQuery)
      .subscribe(
        actors => {
          this.actorSubject.next(actors.data);
          this.totalCount = actors.totalCount;
        }
      )
  }

}
