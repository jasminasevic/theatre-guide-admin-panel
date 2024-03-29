import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from './users.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from './users.model';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { DeleteDialogComponent } from './dialog/delete/delete.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { NotificationService } from '../../shared/services/notification.service';
import { PendingUsersNumberService } from 'src/app/shared/services/pendingUsersNumber.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.sass']
})

export class AllUsersComponent implements AfterViewInit, OnInit {

  user: User;
  dataSource: UserDataSource;
  userDetail: User;
  pendingUserRequests: number; 
  users: number;
  displayedColumns = [
    'no',
    'firstName',
    'email',
    'theatre',
    'roleName',
    // 'createdAt',
    'status',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(
    private usersService: UserService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private pendingUsersNumberService: PendingUsersNumberService) {
    this.pendingUsersNumberService.currentPendingUserStatus$
      .subscribe(pendingRequests => {
        this.pendingUserRequests = pendingRequests
      })
    }

  ngOnInit() {
    this.dataSource = new UserDataSource(this.usersService);
    this.dataSource.loadUsers();
}

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;
            this.loadUsersPage();
        })
    )
    .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
     merge(this.paginator.page, this.sort.sortChange)
        .pipe(
            tap(() => this.loadUsersPage())
        )
        .subscribe();
  }

  loadUsersPage() {
    this.dataSource.loadUsers(
      this.paginator.pageSize,
      this.paginator.pageIndex,
      this.sort.active,
      this.sort.direction,
      this.input.nativeElement.value
       );
  }

  refresh() {
    this.dataSource = new UserDataSource(this.usersService);
    this.input.nativeElement.value = '';
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.dataSource.loadUsers();
  }

  deleteItem(row) {
    this.usersService.getOneUser(row)
    .pipe(
   )
   .subscribe(user =>
     {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
           data: user
        });
        dialogRef.afterClosed().subscribe(result => {
         if (result === 1) {
          this.refresh();
          this.notificationService.showNotification(
            'snackbar-success',
            'Record Deleted Successfully!',
            'bottom',
            'center'
          );
        };
        this.usersService.getUsersFilteredByStatus()
            .subscribe(data => {
              this.users = data,
              this.pendingUsersNumberService.changePendingStatus(this.users)
          });
      });
    });
}

  confirmDelete(row){
    this.usersService.deleteUser(row);
  };

}

export class UserDataSource implements DataSource<User> {

  private usersSubject = new BehaviorSubject<User[]>([]);

  constructor(private userService: UserService) {}

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
      return this.usersSubject.asObservable();}

  disconnect(collectionViewer: CollectionViewer): void {
      this.usersSubject.complete();}

  totalCount: number;

  loadUsers(pageSize = 10, pageIndex = 0, sortOrder = '', sortDirection = '', searchQuery = '') {
      this.userService.getAllUsers(pageSize, pageIndex += 1, sortOrder + '_' + sortDirection, searchQuery)
      .subscribe(users =>
        {
          this.usersSubject.next(users.data),
          this.totalCount = users.totalCount
        });
  }
}

