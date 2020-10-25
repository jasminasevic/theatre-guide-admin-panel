import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_URL, httpOptions } from '../../app.constants';
import { ICategoryData } from '../../shared/interfaces/ICategoryData';
import { Category } from './categories.model';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  private readonly API_URL = API_URL;
  private readonly httpOptions = httpOptions;

  constructor(private httpClient: HttpClient) { }

  getAllCategories(perPage: number, pageNumber: number, sortOrder: string, searchQuery: string){
    let params = new HttpParams;

    params = params.append('perPage', String(perPage));
    params = params.append('pageNumber', String(pageNumber));
    params = params.append('sortOrder', String(sortOrder));
    params = params.append('searchQuery', String(searchQuery));

    return this.httpClient.get<ICategoryData>(this.API_URL + '/categories', { params })
      .pipe(
        map((categoryData: ICategoryData) => categoryData),
        catchError(err => throwError(err))
      )
  }

  addCategory(category) : any {
    return this.httpClient.post<Category>(this.API_URL + '/categories', category)
      .pipe(
        map((category: Category) => category),
        catchError(err => throwError(err))
      )
  }

  editCategory(id: number, category: Category) : Observable<Category>{
    return this.httpClient.put<any>(this.API_URL + '/categories/' + id , category)
      .pipe(
        map((category: Category) => category),
        catchError(err => throwError(err))
      )
  }

  getCategory(id: number) : Observable<Category>{
    return this.httpClient.get<Category>(this.API_URL + '/categories/' + id)
      .pipe(
        map((categoryData: Category) => categoryData),
        catchError(err => throwError(err))
      )
  }

  deleteCategory(id: number){
    return this.httpClient.delete<any>(this.API_URL + '/categories/' + id)
      .subscribe();
  }

}


