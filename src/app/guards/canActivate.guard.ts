import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../modules/login/auth.service';
import { NotificationService } from '../util/notification.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private auth :AuthService,
        private notification : NotificationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if (this.auth.isLoggedIn()) {            
            return true;
        }
        this.notification.error("Sorry but you're not authorized.");
        return this.router.parseUrl('/login');
    }
}
