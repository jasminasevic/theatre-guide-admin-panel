import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { RepertoiresService } from './repertoires.service';
import { Play } from './plays.model';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './dialog/delete/delete.component';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-all-repertories',
  templateUrl: './all-repertories.component.html',
  styleUrls: ['./all-repertories.component.sass']
})

export class AllRepertoriesComponent implements OnInit {

  play: Play;
  dataSource: RepertoireDataSource;

  displayedColumns = [
    'no',
    'title',
    'date',
    'time',
    'theatre',
    'isPremiere',
    'actions'
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private repertoireService: RepertoiresService,
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.dataSource = new RepertoireDataSource(this.repertoireService);
    this.dataSource.loadPlays();
  }

  refresh(){
    this.dataSource = new RepertoireDataSource(this.repertoireService);
    this.input.nativeElement.value = '';
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.dataSource.loadPlays();
  }

  ngAfterViewInit(){
    //server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0,
          this.loadPlaysPages()
        })
      )
      .subscribe()

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        tap(() => this.loadPlaysPages())
      )
      .subscribe();
  }

  loadPlaysPages(){
    this.dataSource.loadPlays(
      this.paginator.pageSize,
      this.paginator.pageIndex,
      this.sort.active,
      this.sort.direction,
      this.input.nativeElement.value
    );
  }

  deleteItem(repertoireId){
    this.repertoireService.getRepertoire(repertoireId)
      .subscribe(repertoire => {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
          data: repertoire
        });
        dialogRef.afterClosed().subscribe(result => {
          if(result === 1){
            this.refresh();
            this.notificationService.showNotification(
              'snackbar-success',
              'Record Deleted Successfully!',
              'bottom',
              'center'
            )}
          })
        })
      }
}

export class RepertoireDataSource implements DataSource<Play>{
  private repertoireSubject = new BehaviorSubject<Play[]>([]);

  constructor(private repertoireService: RepertoiresService){}

  connect(collectionViewer: CollectionViewer): Observable<Play[]> {
    return this.repertoireSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.repertoireSubject.complete();
  }

  totalCount: number;

  loadPlays(pageSize = 10, pageIndex = 0, sortOrder = '', sortDirection = '', searchQuery = ''){
    this.repertoireService.getAllRepertoires(pageSize, pageIndex += 1, sortOrder + '_' + sortDirection, searchQuery)
      .subscribe(plays => {
        this.repertoireSubject.next(plays.data),
        this.totalCount = plays.totalCount
      })
  }

}
