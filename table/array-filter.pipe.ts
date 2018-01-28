import { Pipe, PipeTransform } from '@angular/core';
import { log } from 'util';
import { indexOf } from 'lodash';

@Pipe({
    name: 'filter',
    pure: false
})

export class ArrayFilterPipe implements PipeTransform {

    // Filtering method
    transform(items: any[], term: string) {
        term = term ? term.toLocaleLowerCase() : null;

        // returns list of keys in each object
        const columns = Object.keys(items[0]);
        const subArrays = [],
              indexArray = [];

        let filterResult;

        columns.forEach(column => {
            let itemIndex = 0;

            filterResult = items.filter(item => {
                if (String(item[column]).toLocaleLowerCase().includes(term)) {
                    if (indexArray.indexOf(itemIndex) > -1) {
                        itemIndex++;
                        return false;
                    } else {
                        indexArray.push(itemIndex);
                        itemIndex++;
                        return true;
                    }
                } else {
                    itemIndex++;
                    return false;
                }
            });

            if (filterResult.length > 0) {
                for (let elem in filterResult) {
                    subArrays.push(filterResult[elem]);
                }
            }
        });

        return subArrays;
    }
}
