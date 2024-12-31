import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray',
  standalone: true
})
export class EnumToArrayPipe implements PipeTransform {
  transform(value: any): any[] {
    return Object.entries(value).map(([key, val]) => ({ key, val }));
  }
}

