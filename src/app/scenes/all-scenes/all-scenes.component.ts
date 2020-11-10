import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { DeleteDialogComponent } from './dialog/delete/delete.component';
import { Scene } from './scenes.model';
import { ScenesService } from './scenes.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-all-scenes',
  templateUrl: './all-scenes.component.html',
  styleUrls: ['./all-scenes.component.sass']
})
export class AllScenesComponent implements OnInit {

  scene: Scene;
  dataSource: SceneDataSource;

  displayedColumns = [
    'no',
    'sceneName',
    'theatreName',
    'actions'
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private router: Router,
    private sceneService: ScenesService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.dataSource = new SceneDataSource(this.sceneService);
    this.dataSource.loadScenes();
  }

  refresh(){
    this.dataSource = new SceneDataSource(this.sceneService);
    this.input.nativeElement.value = '';
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.dataSource.loadScenes();
  }

  ngAfterViewInit(){
    //server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0,
          this.loadScenesPages()
        })
      )
      .subscribe()

      // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      // on sort or paginate events, load a new page
      merge(this.paginator.page, this.sort.sortChange)
        .pipe(
          tap(() => this.loadScenesPages())
        )
        .subscribe()
  }

  loadScenesPages(){
    this.dataSource.loadScenes(
      this.paginator.pageSize,
      this.paginator.pageIndex,
      this.sort.active,
      this.sort.direction,
      this.input.nativeElement.value
    );
  }

  deleteItem(id){
    this.sceneService.getScene(id)
      .subscribe(scene => {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
          data: scene
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
        });
      });
  }
}

export class SceneDataSource implements DataSource<Scene>{
  private sceneSubject = new BehaviorSubject<Scene[]>([]);

  constructor(private sceneService: ScenesService){}

  connect(collectionViewer: CollectionViewer): Observable<Scene[]> {
    return this.sceneSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.sceneSubject.complete();
  }

  totalCount: number;

  loadScenes(pageSize = 10, pageIndex = 0, sortOrder = '', sortDirection = '', searchQuery = ''){
    this.sceneService.getAllScenes(pageSize, pageIndex += 1, sortOrder + '_' + sortDirection, searchQuery)
      .subscribe(scenes => {
        this.sceneSubject.next(scenes.data),
        this.totalCount = scenes.totalCount
      })
  }
}
