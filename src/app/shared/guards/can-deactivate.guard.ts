import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivateCheck } from 'src/app/types/can-deactivate-check';

@Injectable()
export default class CanDeactivateGuard implements CanDeactivate<CanDeactivateCheck> {
    canDeactivate(component: CanDeactivateCheck): Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate();
    }

}