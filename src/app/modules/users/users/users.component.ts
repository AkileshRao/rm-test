import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService, IUser } from '../../login/auth.service';
import { MatPaginator } from '@angular/material';
import { UsersService } from '../users.service';
import { UsersDataSource } from './usersDatasource';
import { tap } from 'rxjs/operators';
import { NotificationService } from 'src/app/util/notification.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  
  public user: IUser;
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  public dataSource: UsersDataSource;
  constructor(public auth: AuthService,
    public userService: UsersService,
    public notification : NotificationService) { }

  ngOnInit() {
    this.paginator.pageSize = 6;
    this.dataSource = new UsersDataSource(this.userService, this.notification);
    this.dataSource.loadUsers(this.paginator.pageIndex + 1);
  }

  ngAfterViewInit() {
    this.dataSource.counter$.pipe(
      tap((count) => {
        this.paginator.length = count;
      })
    ).subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.dataSource.loadUsers(this.paginator.pageIndex + 1))
      )
      .subscribe();
  }

}
