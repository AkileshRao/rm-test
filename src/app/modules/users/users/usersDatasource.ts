import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { IUser } from '../../login/auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { UsersService } from '../users.service';
import { NotificationService } from 'src/app/util/notification.service';

export class UsersDataSource implements DataSource<IUser> {

    private usersSubject = new BehaviorSubject<IUser[]>([]);
    private countSubject = new BehaviorSubject<number>(0);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public counter$ = this.countSubject.asObservable();
    public loading$ = this.loadingSubject.asObservable();

    constructor(private userService: UsersService, private notification : NotificationService) { }

    connect(collectionViewer: CollectionViewer): Observable<IUser[]> {
        console.log("Connecting datasource");

        return this.usersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.usersSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    loadUsers(pageIndex: number = 0) {
        this.loadingSubject.next(true);

        this.userService.getUsers(pageIndex + "").pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(data => {
            this.usersSubject.next(data.data);
            this.countSubject.next(data.total);
        }, err => {
            this.notification.error("Something went wrong!")
        })
    }
}
