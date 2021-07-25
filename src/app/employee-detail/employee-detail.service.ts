import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeModel } from './employee-detail.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailService {

  constructor(private http: HttpClient) { }

  getDataList(){
    return this.http.get<EmployeeModel[]>('../../assets/employee-list.json');
  }

}
