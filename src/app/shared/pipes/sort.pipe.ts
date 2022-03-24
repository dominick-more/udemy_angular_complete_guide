import { Pipe, PipeTransform } from '@angular/core';
import { isNil, isNumeric, isPlainObject, isString } from '../app.utilities';

@Pipe({
  name: 'sort',
  pure: false,
})
export class SortPipe implements PipeTransform {

  transform(value: any, sortKey: string): any {
    if (isNil(value)) {
      return value;
    }
    if (!Array.isArray(value)) {
      console.warn(`value type ${typeof value} is not an array and can't be sorted`);
      return value;
    }
    return value.sort((a: any, b: any): number => {
      const aValue = isPlainObject(a) ? a[sortKey] : undefined; 
      const bValue = isPlainObject(b) ? b[sortKey] : undefined; 
      if (aValue === undefined) {
        return bValue === undefined ? 0 : -1;
      } else {
        if (bValue === undefined) {
          return aValue === undefined ? 0 : 1;
        }
      }
      if (isString(aValue)) {
        return aValue.localeCompare(String(bValue));
      }
      if (isNumeric(aValue)) {
        return aValue - Number(bValue);
      }
      return aValue - bValue;
    });
  }

}
