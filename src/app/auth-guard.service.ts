import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import AuthService from './auth.service';

@Injectable()
export default class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(private readonly router: Router,
        private readonly authService: AuthService) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.isAuthenticated().then((authenticated: boolean) => {
            if (authenticated) {
                return true;
            }
            return this.router.navigate(['/']);
        });
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }

    
}