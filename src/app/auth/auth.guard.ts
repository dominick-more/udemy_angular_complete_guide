import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { isNil } from '../shared/app.utilities';
import { AuthService } from './auth.service';

@Injectable()
export default class AuthGuard implements CanActivate {
    
    constructor(private readonly router: Router, private readonly authService: AuthService) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.authService.userSubject.pipe(take(1), map((userToken) =>
            isNil(userToken?.token) ? this.router.createUrlTree(['/auth']) : true));
    }
}