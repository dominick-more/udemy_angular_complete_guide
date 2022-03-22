import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export default class CustomValidators {
    public static readonly createPatternMatchValidator = (params: {pattern: RegExp; validationKey: string}): (control: AbstractControl) => ValidationErrors | null => {
        const {pattern, validationKey} = params;
        return (control) => {
            if (pattern.test(control.value)) {
            return {[validationKey]: true};
          }
          return null;
        };
    };

    public static readonly createAsyncPatternMatchValidator = (params: {pattern: RegExp; validationKey: string, timeout: number}): (control: AbstractControl) => Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const {pattern, validationKey, timeout} = params;
        return (control) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (pattern.test(control.value)) {
                        resolve({[validationKey]: true});
                    } else {
                        resolve(null);
                    }
                }, timeout);
            });
        };
    };
}