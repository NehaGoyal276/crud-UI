import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEmployee } from '../Interfaces/Employee';
import e from 'express';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

http = inject(HttpClient);
apiUrl = 'https://localhost:7284';


  constructor() { }

  getAllEmp()
  {
    return this.http.get<IEmployee[]>((this.apiUrl)+'/api/Employee')
  }

  createEmployee(employee:IEmployee){
    return this.http.post((this.apiUrl)+'/api/Employee', employee);
  }

  editEmployee(employeeId:number, employee:IEmployee){
    return this.http.put(this.apiUrl + '/api/Employee/' +employeeId, employee);
  }

  getEmployee(employeeId:number){
    return this.http.get<IEmployee>(this.apiUrl + '/api/Employee/getEmpById/' +employeeId);
  }

  deleteEmployee(employeeId:number){
    return this.http.delete<IEmployee>(this.apiUrl+'/api/Employee/' +employeeId)
  }

}
