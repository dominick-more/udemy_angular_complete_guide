import { Pipe, PipeTransform } from '@angular/core';
import { isNil, isString } from '../app.utilities';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any): any {
    if (isNil(value)) {
      return value;
    }
    if (isString(value)) {
      return Array.from(value).reverse().join('');
    }
    if (Array.isArray(value)) {
      return value.reverse();
    }
    console.warn(`Don\'t know how to reverse value of type ${typeof value}`);
    return value;
  }

}
