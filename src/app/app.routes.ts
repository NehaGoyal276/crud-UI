import { Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

export const routes: Routes = [



    {
        path: "",
        component:EmployeeListComponent
    },
    
    {
        path: "employee-list",
        component:EmployeeListComponent
    },
    {
        path: "employee/:id",
        component:EmployeeFormComponent
    },

    {
        path: "employee-form",
        component:EmployeeFormComponent
    },
    
];
