import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { UserService, IUserData } from './users.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from './users.model';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialog/delete/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, finalize, tap } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { SortDirection } from '@swimlane/ngx-datatable';
import { MatInputModule } from '@angular/material/input/input-module';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.sass']
})


export class AllUsersComponent implements AfterViewInit, OnInit {

  user: User;
  dataSource: UserDataSource;
  userDetail: User;
  displayedColumns = [
    'firstName',
    'lastName',
    'email',
    'roleName',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  onRowClicked(row) {
    console.log('Row clicked: ', row);
}

  constructor(
    private snackBar: MatSnackBar,
    private usersService: UserService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
   // this.user = this.route.snapshot.data["user"];
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
          this.showNotification(
            'snackbar-success',
            'Record Deleted Successfully!',
            'bottom',
            'center'
          )};
        });
     });
}

  confirmDelete(row){
    this.usersService.deleteUser(row);
  };

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
}

export class UserDataSource implements DataSource<User> {

  private usersSubject = new BehaviorSubject<User[]>([]);
  // private loadingSubject = new BehaviorSubject<boolean>(false);
  // public loading$ = this.loadingSubject.asObservable();

  constructor(private userService: UserService) {}

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
      return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.usersSubject.complete();
    //  this.loadingSubject.complete();
  }

  totalCount: number;
  loadUsers(pageSize = 10, pageIndex = 0, sortOrder = '', sortDirection = '', searchQuery = '') {

    //  this.loadingSubject.next(true);
      this.userService.getAllUsers(pageSize, pageIndex += 1, sortOrder + '_' + sortDirection, searchQuery)
      .pipe(
         // Error(() => of([])),
          // finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(users =>
        {
          this.usersSubject.next(users.data),
          this.totalCount = users.totalCount
        });
  }
}

