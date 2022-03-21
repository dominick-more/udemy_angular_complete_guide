import { Pipe, PipeTransform } from '@angular/core';
import { isNil, isString } from '../app.utilities';

@Pipe({
  name: 'urlEncode'
})
export class UrlEncodePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (isNil(value)) {
      return value;
    }
    return window.encodeURIComponent(isString(value) ? value : String(value));
  }

}
