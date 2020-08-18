import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { SortDirection } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-all-staff',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.sass']
})


export class AllUsersComponent implements AfterViewInit, OnInit {

  user: User;
  dataSource: UserDataSource;
  displayedColumns = [
    'id',
    'firstName',
    'lastName',
    'email'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  onRowClicked(row) {
    console.log('Row clicked: ', row);
}

  // usersDatabase: IUserData | null;
  // userDataSource: User[] | null;

  // exampleDatabase: UserService | null;

  // selection = new SelectionModel<User>(true, []);
  // id: number;
  // user: User | null;
  constructor(
    // public httpClient: HttpClient,
    // public dialog: MatDialog,
    // public userService: UserService,
    // private snackBar: MatSnackBar
    private usersService: UserService,
    private route: ActivatedRoute
  ) { }
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild('filter', { static: true }) filter: ElementRef;
  // @ViewChild(MatMenuTrigger)
  // contextMenu: MatMenuTrigger;
  // contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.user = this.route.snapshot.data["user"];
    this.dataSource = new UserDataSource(this.usersService);
    this.dataSource.loadUsers();
}


  ngAfterViewInit() {
    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

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
      this.sort.direction
       );
  }


  // ngOnInit() {
  //   this.loadData();
  // }
  // refresh() {
  //   this.loadData();
  // }
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
  }
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

  // pageSize = 5;
  // pageIndex = 1;
  // userData: User[];
  // totalRows: number;

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
  // showNotification(colorName, text, placementFrom, placementAlign) {
  //   this.snackBar.open(text, '', {
  //     duration: 2000,
  //     verticalPosition: placementFrom,
  //     horizontalPosition: placementAlign,
  //     panelClass: colorName
  //   });
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
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private userService: UserService) {}

  connect(collectionViewer: CollectionViewer): Observable<User[]> {
      return this.usersSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.usersSubject.complete();
      this.loadingSubject.complete();
  }

  totalCount: number;
  loadUsers(pageSize = 5, pageIndex = 0, sortOrder = '', sortDirection = '') {

      this.loadingSubject.next(true);

      this.userService.getAllUsers(pageSize, pageIndex += 1, sortOrder + '_' + sortDirection)
      .pipe(
         // Error(() => of([])),
          finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(users =>
        {
          this.usersSubject.next(users.data),
          this.totalCount = users.totalCount
        });
      console.log("Sort order je " + sortOrder + " a sort Direction " + sortDirection);

  }
}




// export class ExampleDataSource extends DataSource<User> {
//   _filterChange = new BehaviorSubject('');
//   get filter(): string {
//     return this._filterChange.value;
//   }
//   set filter(filter: string) {
//     this._filterChange.next(filter);
//   }
//   filteredData: User[] = [];
//   renderedData: User[] = [];
//   constructor(
//     public _exampleDatabase: UserService,
//     public _paginator: MatPaginator,
//     public _sort: MatSort
//   ) {
//     super();
//     // Reset to the first page when the user changes the filter.
//     this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
//   }


//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<User[]> {
//     // Listen for any changes in the base data, sorting, filtering, or pagination
//     const displayDataChanges = [
//       this._exampleDatabase.dataChange,
//       this._sort.sortChange,
//       this._filterChange,
//       this._paginator.page
//     ];
//     this._exampleDatabase.getAllUsers(this._paginator.pageSize, this._paginator.pageIndex);
//     return merge(...displayDataChanges).pipe(
//       map(() => {
//         // Filter data
//         this.filteredData = this._exampleDatabase.data
//           .slice()
//           .filter((user: User) => {
//             const searchStr = (
//               user.FirstName +
//               user.LastName +
//               user.Email
//             ).toLowerCase();
//             return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//           });
//         // Sort filtered data
//         const sortedData = this.sortData(this.filteredData.slice());
//         // Grab the page's slice of the filtered sorted data.
//         const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
//         this.renderedData = sortedData.splice(
//           startIndex,
//           this._paginator.pageSize
//         );
//         return this.renderedData;
//       })
//     );
//   }
//   disconnect() { }
//   /** Returns a sorted copy of the database data. */
//   sortData(data: User[]): User[] {
//     if (!this._sort.active || this._sort.direction === '') {
//       return data;
//     }
//     return data.sort((a, b) => {
//       let propertyA: number | string = '';
//       let propertyB: number | string = '';
//       switch (this._sort.active) {
//         case 'id':
//           [propertyA, propertyB] = [a.Id, b.Id];
//           break;
//         case 'firstName':
//           [propertyA, propertyB] = [a.FirstName, b.FirstName];
//           break;
//         case 'email':
//           [propertyA, propertyB] = [a.Email, b.Email];
//           break;
//         case 'lastName':
//           [propertyA, propertyB] = [a.LastName, b.LastName];
//           break;
//       }
//       const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//       const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
//       return (
//         (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
//       );
//     });
//   }
// }
