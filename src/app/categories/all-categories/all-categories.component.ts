import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { CategoriesService } from '../all-categories/categories.service';
import { Category } from './categories.model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../all-categories/dialog/delete/delete.component';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.scss']
})
export class AllCategoriesComponent implements OnInit {

  category: Category;
  dataSource: CategoryDataSource;

  displayedColumns = [
    'number',
    'category',
    'actions'
  ]

  @ViewChild('input') input: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoryService: CategoriesService,
    private dialog: MatDialog,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.dataSource = new CategoryDataSource(this.categoryService);
    this.dataSource.loadCategories();
  }

  refresh() {
    this.dataSource = new CategoryDataSource(this.categoryService);
    this.input.nativeElement.value = '';
    this.paginator.pageSize = 10;
    this.paginator.pageIndex = 0;
    this.dataSource.loadCategories();
  }

  deleteItem(categoryId){
    this.categoryService.getCategory(categoryId)
      .subscribe(category => {
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
          data: category
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
              )};
          });
      });
  }

  ngAfterViewInit(){
    //server-side search
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap(()=> {
        this.paginator.pageIndex = 0;
        this.loadCategoriesPage();
      })
    )
    .subscribe()

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // on sort or paginate events, load a new page
     merge(this.paginator.page, this.sort.sortChange)
        .pipe(
            tap(() => this.loadCategoriesPage())
        )
        .subscribe();
  }


  loadCategoriesPage(){
    this.dataSource.loadCategories(
      this.paginator.pageSize,
      this.paginator.pageIndex,
      this.sort.active,
      this.sort.direction,
      this.input.nativeElement.value
    );
  }
}

export class CategoryDataSource implements DataSource<Category>{
  private categorySubject = new BehaviorSubject<Category[]>([]);

  constructor(private categoryService: CategoriesService){}

  connect(collectionViewer: CollectionViewer): Observable<Category[]>{
    return this.categorySubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.categorySubject.complete();
  }

  totalCount: number;
  rowNumber: number;

  loadCategories(pageSize = 10, pageIndex = 0, sortOrder = '', sortDirection = 'asc', searchQuery = ''){
    this.categoryService.getAllCategories(pageSize, pageIndex += 1, sortOrder + '_' + sortDirection, searchQuery)
      .subscribe(
        categories => {
          this.categorySubject.next(categories.data);
          this.totalCount = categories.totalCount;
        }
      )
  }
}
