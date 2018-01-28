import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ArraySortPipe } from '../../core/utils/array-sort/array-sort.pipe';
import { ArrayFilterPipe } from '../../core/utils/array-filter/array-filter.pipe';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../models/client';
import { Car } from '../models/car';
import { tableData } from './service-table-data';
// import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.css']
})

export class ServiceTableComponent implements OnInit {

  serviceArraySortPipe = new ArraySortPipe();
  serviceArrayFilterPipe = new ArrayFilterPipe();

  serviceArrayModified:Array<object>;

  sortOrder:string = '';
  isModified:boolean = false;
  serviceTableData:object = tableData;

  constructor() {}

  ngOnInit() {}

  getKeyValue(obj, index) {
    let keyVal;

    if (index >= 0) {
      keyVal = Object.keys(obj)[index];
      return obj[keyVal];
    } else {
      return keyVal = Object.values(obj);
    }
  }

  getKey(obj, index) {
    let keyName;

    keyName = Object.keys(obj)[index];
    return keyName;
  }

  setStatus(status, isClass) {
    if (isClass) {
      return status;
    } else if (!isClass && status === 'in-progress') {
      return 'w trakcie';
    } else if (!isClass && status === 'awaiting') {
      return 'oczekuje';
    } else if (!isClass && status === 'done') {
      return 'wykonano';
    }
  }

  setService(service) {
    switch (service) {
      case 'Mycie detailingowe':
        return 'fa-shower';
      case 'Felgi / opony':
        return 'fa-circle-o';
      // ======
      // TODO: more icons to add when assets are ready
      // ======
      default:
        return 'fa-paint-brush';
    }
  }

  columnDisplay(event, key) {
    event.stopPropagation();
    event.preventDefault();

    console.log('click!', event);
    tableData.displayBool[key] = !tableData.displayBool[key];
    console.log(tableData.displayBool[key];)
  }

  implementSort(index, array) {
    if (this.sortOrder === '' || this.sortOrder === 'desc') {
      this.sortOrder = 'asc';
    } else if (this.sortOrder === 'asc') {
      this.sortOrder = 'desc';
    } else {
      console.log('Wrong parameter!');
      return;
    }

    const arg = Object.keys(tableData.tableHeaders)[index];

    if (this.isModified) {
      this.serviceArrayModified = this.serviceArraySortPipe.transform(this.serviceArrayModified, arg, this.sortOrder);
    } else {
      tableData.dataArray = this.serviceArraySortPipe.transform(tableData.dataArray, arg, this.sortOrder);
    }
  }

  implementFilter(term) {
    if (term) {
      this.isModified = true;
    } else {
      this.isModified = false;
    }
    this.serviceArrayModified = this.serviceArrayFilterPipe.transform(tableData.dataArray, term);

    // console.log(
    //   this.serviceArrayModified
    // );

    return this.serviceArrayModified;
  }

  implementPagination() {
    // TODO: pagination method
  }

  dataDisplay() {
    if (this.isModified) {
      return this.serviceArrayModified;
    } else {
      return tableData.dataArray;
    }
  }

}
