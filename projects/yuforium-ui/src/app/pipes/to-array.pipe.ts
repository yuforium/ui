import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArray',
  standalone: true
})
export class ToArrayPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any[] {
    if (Array.isArray(value)) {
      return value;
    }
    else if (value) {
      return [value];
    }

    return [];
  }
}
