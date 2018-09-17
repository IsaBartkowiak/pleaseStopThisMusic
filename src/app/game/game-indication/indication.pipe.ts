import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indication'
})
export class IndicationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
