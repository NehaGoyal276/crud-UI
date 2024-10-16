import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpServiceService } from '../../Services/http-service.service';
import { IEmployee } from '../../Interfaces/Employee';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [RouterLink, MatInputModule,MatButtonModule, FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  formBuilder =inject (FormBuilder);
  httpService = inject(HttpServiceService);
  route = inject(Router);
  router = inject(ActivatedRoute);


  employeeId!:number;
  isEdit= false;
ngOnInit() {
  this.employeeId = this.router.snapshot.params['id'];
  if(this.employeeId)
    {
    this.isEdit =true;
  }
  
  this.httpService.getEmployee(this.employeeId).subscribe(result =>{
    this.employeeForm.patchValue(result);
    // this.employeeForm.controls.email.disable();
    })
  
}





employeeForm = this.formBuilder.group({
  name: ['', [Validators.required, Validators.email]],
  email:['', [Validators.required]],
  age: ['0', [Validators.required]],
  contact: ['', [Validators.required]],
  salary: ['', [Validators.required]]
})



save(){
  console.log(this.employeeForm.value);
  const employee: IEmployee={
    
    name: this.employeeForm.value.name!,
    email: this.employeeForm.value.email!,
    age: this.employeeForm.value.age!,
    salary: this.employeeForm.value.salary!,
    contact: this.employeeForm.value.contact!
  };
  if(this.isEdit){
    this.httpService.editEmployee(this.employeeId,employee)
    .subscribe(()=>{
      console.log("updated");
      this.route.navigateByUrl("/employee-list")
        })
  }

  else{
    this.httpService.createEmployee(employee).subscribe(()=>{
      console.log("success");
      this.route.navigateByUrl("/")
  
        })
  }
  
}
}
