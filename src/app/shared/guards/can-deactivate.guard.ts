import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivateCheck } from 'src/app/types/can-deactivate-check';

@Injectable()
export default class CanDeactivateGuard implements CanDeactivate<CanDeactivateCheck> {
    canDeactivate(component: CanDeactivateCheck, _currentRoute: ActivatedRouteSnapshot, _currentState: RouterStateSnapshot, _nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return component.canDeactivate();
    }

}