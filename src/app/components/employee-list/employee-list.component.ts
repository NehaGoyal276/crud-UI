import { Component, Inject, inject } from '@angular/core';
import { IEmployee } from '../../Interfaces/Employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../Services/http-service.service';
import { cwd } from 'process';

import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,MatIconModule,RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'age','salary','contact','edit', 'delete'];
  employeeList: IEmployee[] = [];

  router= inject(Router)
  route = inject(ActivatedRoute)
  httpService = inject(HttpServiceService)
  ngOnInit() {
 
    
    this.httpService.getAllEmp().subscribe(res =>{
     
      this.employeeList=res;
      // console.log(this.employeeList);
    })
  
  
  }

  loadEmployee(){
    this.httpService.getAllEmp().subscribe(res =>{
     
      this.employeeList=res;

    })

  }


  edit(id: number): void{
    
    console.log(id);
    this.router.navigateByUrl("/employee/"+id);

  }
  delete(id: number){
    this.httpService.deleteEmployee(id).subscribe(res=>{
      this.loadEmployee();
    })
  }

}
