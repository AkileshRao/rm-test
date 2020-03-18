import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface IUser {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users: IUser[] = [];
  public pageIndex: number = 0;
  public totalPages: number = 0;
  constructor(private http: HttpClient) { }

  public getUsers(page: string): any {
    return this.http.get(`https://reqres.in/api/users`, { params: new HttpParams().set('page', page) });
  }
}
