import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Role } from './roles.model';
import { RolesService } from './roles.service';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './dialog/delete/delete.component';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-all-roles',
  templateUrl: './all-roles.component.html',
  styleUrls: ['./all-roles.component.scss']
})
export class AllRolesComponent implements OnInit {

  role: Role;
  dataSource: RoleDataSource;

  displayedColumns = [
    'number',
    'role',
    'actions'
  ]

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;

  constructor(private roleService: RolesService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.dataSource = new RoleDataSource(this.roleService);
    this.dataSource.loadRoles();
  }

  refresh(){
    this.dataSource = new RoleDataSource(this.roleService);
    this.input.nativeElement.value = '';
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.dataSource.loadRoles();
  }

  ngAfterViewInit(){
    //server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0,
          this.loadRolesPages()
        })
      )
      .subscribe()

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
    merge(this.paginator.page, this.sort.sortChange)
      .pipe(
        tap(() => this.loadRolesPages())
      )
      .subscribe();
  }


  loadRolesPages(){
    this.dataSource.loadRoles(
      this.paginator.pageSize = 10,
      this.paginator.pageIndex = 0,
      this.sort.active,
      this.sort.direction,
      this.input.nativeElement.value
    )
  }

  deleteItem(roleId){
    this.roleService.getRole(roleId)
      .subscribe(role => {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
          data: role
        });
        dialogRef.afterClosed()
          .subscribe(result => {
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


export class RoleDataSource implements DataSource<Role>{
  private roleSubject = new BehaviorSubject<Role[]>([]);

  constructor(private roleService: RolesService){}

  connect(collectionViewer: CollectionViewer): Observable<Role[]> {
    return this.roleSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.roleSubject.complete();
  }

  totalCount: number;
  rowNumber: number;

  loadRoles(pageSize = 10, pageIndex = 0, sortOrder = '', sortDirection = '', searchQuery = ''){
    this.roleService.getAllRoles(pageSize, pageIndex += 1, sortOrder + '_' + sortDirection, searchQuery)
      .subscribe(
        roles => {
          this.roleSubject.next(roles.data);
          this.totalCount = roles.totalCount;
        }
      )
  }
}
