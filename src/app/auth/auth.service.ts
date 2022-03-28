import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { isNil, isString } from '../shared/app.utilities';
import { ServerRootUrl } from '../shared/constants';
import AuthResponse from '../types/auth-response.model';
import UserCredentials from '../types/user-credentials.model';

const MillsInHour = 60 * 60 * 1000;
const UserTokenKey = 'userData';

const errorSelector = (err: any): Observable<never> => {
  let errorMessage: string;
  switch(true) {
    case err instanceof HttpErrorResponse:
      if (isString(err.error)) {
        errorMessage = err.error;
      } else if (isString(err.message)) {
        errorMessage = err.message;
      } else {
        errorMessage = 'An unknown error occurred!';
      }
      break;
    case err instanceof Error:
      errorMessage = err.message;
      break;
    case isString(err):
      errorMessage = err;
      break;
    default:
      errorMessage = 'An unknown error occurred!';
  };
  return throwError(() => new Error(errorMessage));
};

export class UserToken {
  constructor(
    public readonly email: string,
    public readonly id: number,
    private readonly _token: string,
    private readonly _expires: Date | undefined) {}

    createAuthHeader(): Record<string, string> | undefined {
      const token = this.token;
      if (isNil(token)) {
        return undefined;
      }
      return {Authorization: `Bearer ${token}`};
    }

    get token(): string | null {
    if (this.expired) {
      return null;
    }
    return this._token;
  }

  get expired(): boolean {
    return !isNil(this._expires) && (new Date() > this._expires);
  }

  get expiresTime(): number {
    return !isNil(this._expires) ? this._expires.getTime() : Number.MAX_SAFE_INTEGER;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly userSubject = new BehaviorSubject<UserToken| undefined>(undefined);
  private autoLogoutTimer: ReturnType<typeof setTimeout> | undefined;

  constructor(private readonly client: HttpClient, private readonly router: Router) { }

  private handleAuthentication(resp: AuthResponse): void {
    // json-server-auth token expires in an hour 
    const expires = new Date(Date.now() + MillsInHour);
    const userToken = new UserToken(resp.user.email, resp.user.id, resp.accessToken, expires);
    localStorage?.setItem(UserTokenKey, JSON.stringify(userToken));
    this.autoLogout(userToken.expiresTime - Date.now());
    this.userSubject.next(userToken);
  }

  autoLogin() {
    const userTokenString = localStorage?.getItem(UserTokenKey);
    const userTokenObj = (() => {
      try {
        return !isNil(userTokenString) ? JSON.parse(userTokenString) : undefined;
      } catch (err: any) {
        console.warn(`Unable to parse localStorage userToken string: ${userTokenString}`);
        return undefined;
      }
    })();
    if (isNil(userTokenObj)) {
      return;
    }
    const expires = isString(userTokenObj._expires) ? new Date(userTokenObj._expires) : undefined;
    const loadedUserToken = new UserToken(userTokenObj.email, userTokenObj.id, userTokenObj._token, expires);
    if (!loadedUserToken.expired) {
      this.autoLogout(loadedUserToken.expiresTime - Date.now());
      this.userSubject.next(loadedUserToken);
    }
  }

  private autoLogout(expirationDuration: number) {
    if (!isNil(this.autoLogoutTimer)) {
      clearTimeout(this.autoLogoutTimer);
      this.autoLogoutTimer = undefined;
    }
    this.autoLogoutTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  login(creds: UserCredentials): Observable<void> {
    return this.client.post<AuthResponse>(`${ServerRootUrl}login`, creds).pipe(
      tap((value) => {
        console.debug('login response is: ' + JSON.stringify(value));
        this.handleAuthentication(value);
      }),
      map((): void => {}),
      catchError(errorSelector)
    );
  }

  logout(): void {
    if (!isNil(this.autoLogoutTimer)) {
      clearTimeout(this.autoLogoutTimer);
      this.autoLogoutTimer = undefined;
    }
    localStorage?.removeItem(UserTokenKey);
    this.userSubject.next(undefined);
    this.router.navigate(['/auth']);
  }

  register(creds: UserCredentials): Observable<void> {
    return this.client.post<AuthResponse>(`${ServerRootUrl}register`, creds).pipe(
      tap((value) => {
        console.warn('register response is: ' + JSON.stringify(value));
        this.handleAuthentication(value);
      }),
      map((): void => {}),
      catchError(errorSelector)
    );
  }
}
