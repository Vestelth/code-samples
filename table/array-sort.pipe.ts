import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'sort'
})

export class ArraySortPipe implements PipeTransform {

  // Sorting method
  transform(array: Array<any>, arg: string, dir: string) {
      if (!array) { return; }

      const sortObj = (a, b) => {
          if (dir === 'asc') {
              return (a[arg] > b[arg]) ? 1 : ((b[arg] > a[arg]) ? -1 : 0);
          } else if (dir === 'desc') {
              return (a[arg] < b[arg]) ? 1 : ((b[arg] < a.arg) ? -1 : 0);
          }
      };

      array.sort(sortObj);
      return array;
  }

}
