import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filterFeed'
})
export class FilterFeedPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items) return [];
    if (!value) return items;


    return items.filter(str => {
      return str[field].toLowerCase().includes(value.toLowerCase());
    });
  }
}


