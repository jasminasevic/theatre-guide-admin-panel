import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './users.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class UserService {
  private readonly API_URL = 'assets/data/users.json';
  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) { }
  get data(): User[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllUsers(): void {
    this.httpClient.get<User[]>(this.API_URL).subscribe(
      data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
  }
  // DEMO ONLY, you can find working methods below
  addUser(user: User): void {
    this.dialogData = user;
  }
  updateUser(user: User): void {
    this.dialogData = user;
  }
  deleteUser(id: number): void {
    console.log(id);
  }
}
