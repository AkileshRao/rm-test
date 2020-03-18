import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/util/localStorage.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/util/notification.service';

export interface IUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
    private storage: LocalStorageService,
    private router: Router,
    private notification: NotificationService) { }

  public login(user: IUser): any {
    return this.http.post(`https://reqres.in/api/login`, user);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem("token") ? true : false;
  }

  public logout(): void {
    this.storage.remove("token");
    this.router.navigate(["/login"]);
    this.notification.success("You have successfully logged out!");
  }
}
