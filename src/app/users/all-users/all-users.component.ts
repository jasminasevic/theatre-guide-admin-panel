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
    // public httpClient: HttpClient,
    // public dialog: MatDialog,
    // public userService: UserService,
    private snackBar: MatSnackBar,
    private usersService: UserService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) { }
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild('filter', { static: true }) filter: ElementRef;
  // @ViewChild(MatMenuTrigger)
  // contextMenu: MatMenuTrigger;
  // contextMenuPosition = { x: '0px', y: '0px' };

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
  // addNew() {
  //   const dialogRef = this.dialog.open(FormDialogComponent, {
  //     data: {
  //       user: this.user,
  //       action: 'add'
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //       // After dialog is closed we're doing frontend updates
  //       // For add we're just pushing a new row inside DataService
  //       this.exampleDatabase.dataChange.value.unshift(
  //         this.userService.getDialogData()
  //       );
  //       this.refreshTable();
  //       this.showNotification(
  //         'snackbar-success',
  //         'Add Record Successfully...!!!',
  //         'bottom',
  //         'center'
  //       );
  //     }
  //   });
  // }
  // editCall(row) {
  //   this.id = row.id;
  //   const dialogRef = this.dialog.open(FormDialogComponent, {
  //     data: {
  //       user: row,
  //       action: 'edit'
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //       // When using an edit things are little different, firstly we find record inside DataService by id
  //       const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
  //         x => x.Id === this.id
  //       );
  //       // Then you update that record using data from dialogData (values you enetered)
  //       this.exampleDatabase.dataChange.value[
  //         foundIndex
  //       ] = this.userService.getDialogData();
  //       // And lastly refresh table
  //       this.refreshTable();
  //       this.showNotification(
  //         'black',
  //         'Edit Record Successfully...!!!',
  //         'bottom',
  //         'center'
  //       );
  //     }
  //   });
  // }

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

  editCall(row){

  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
}

  // deleteItem(row) {
  //   this.id = row.id;
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     data: row
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 1) {
  //       const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
  //         x => x.Id === this.id
  //       );
  //       // for delete we use splice in order to remove single object from DataService
  //       this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
  //       this.refreshTable();
  //       this.showNotification(
  //         'snackbar-danger',
  //         'Delete Record Successfully...!!!',
  //         'bottom',
  //         'center'
  //       );
  //     }
  //   });
  // }
  // private refreshTable() {
  //   this.paginator._changePageSize(this.paginator.pageSize);

  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.renderedData.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected()
  //     ? this.selection.clear()
  //     : this.dataSource.renderedData.forEach((row) =>
  //       this.selection.select(row)
  //     );
  // }
  // removeSelectedRows() {
  //   const totalSelect = this.selection.selected.length;
  //   this.selection.selected.forEach((item) => {
  //     const index: number = this.dataSource.renderedData.findIndex(
  //       (d) => d === item
  //     );
  //     // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
  //     this.exampleDatabase.dataChange.value.splice(index, 1);
  //     this.refreshTable();
  //     this.selection = new SelectionModel<User>(true, []);
  //   });
  //   this.showNotification(
  //     'snackbar-danger',
  //     totalSelect + ' Record Delete Successfully...!!!',
  //     'bottom',
  //     'center'
  //   );
  // }


  // public loadData() {
  //   this.userService.getAllUsers(this.pageSize, this.pageIndex).subscribe(
  //     data =>
  //         {
  //           this.userDataSource = data.data;
  //           this.totalRows = data.totalCount;
  //           this.paginator,
  //           this.sort,
  //           console.log("Vrednosti u userData su: " + data.totalCount);
  //         },
  //         error => {
  //           console.log(error);
  //         });

  //   this.exampleDatabase = new UserService(this.httpClient);
  //   this.dataSource = new ExampleDataSource(
  //     this.exampleDatabase,
  //     this.paginator,
  //     this.sort
  //   );
  //   fromEvent(this.filter.nativeElement, 'keyup')
  //   .pipe(
  //     debounceTime(150),
  //     distinctUntilChanged()
  //   )
  //     .subscribe(() => {
  //       if (!this.dataSource) {
  //         return;
  //       }
  //       this.dataSource.filter = this.filter.nativeElement.value;
  //     });
  // }


  // // context menu
  // onContextMenu(event: MouseEvent, item: User) {
  //   event.preventDefault();
  //   this.contextMenuPosition.x = event.clientX + 'px';
  //   this.contextMenuPosition.y = event.clientY + 'px';
  //   this.contextMenu.menuData = { item: item };
  //   this.contextMenu.menu.focusFirstItem('mouse');
  //   this.contextMenu.openMenu();
  // }
//}

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

