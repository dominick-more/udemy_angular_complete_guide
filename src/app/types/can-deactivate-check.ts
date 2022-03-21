import { Observable } from 'rxjs';

export type CanDeactivateCheck = {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export default CanDeactivateCheck;