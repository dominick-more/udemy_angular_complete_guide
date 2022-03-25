import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import { isNil } from '../shared/app.utilities';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.userSubject.pipe(take(1), exhaustMap((user) => {
      const authHeader = user?.createAuthHeader();
      const modRequest = !isNil(authHeader) ? request.clone({ setHeaders: authHeader }) : request;
      return next.handle(modRequest);
    }));
  }
}
