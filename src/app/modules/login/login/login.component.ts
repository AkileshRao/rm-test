import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/util/localStorage.service';
import { NotificationService } from 'src/app/util/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public apiCallInProgress: boolean = false;
  public userForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', Validators.required)
  })
  constructor(
    public auth: AuthService,
    private router: Router,
    private storage: LocalStorageService,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['users']);
    }
  }

  public login() {
    this.apiCallInProgress = true;
    console.log(this.apiCallInProgress);
    
    this.auth.login(this.userForm.value).subscribe(res => {
      this.storage.store("token", res.token);
      this.notification.success("Logged In Successfully");
      this.router.navigate(['users']);
      this.apiCallInProgress = false;
    }, err => {
      this.apiCallInProgress = false;
      console.log(err);
      this.notification.error(err.error.error);
    })
  }

}
