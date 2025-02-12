import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeIndexComponent } from './components/employee/employee-index/employee-index.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { EmployeeDeleteComponent } from './components/employee/employee-delete/employee-delete.component';

import { ProjectCreateComponent } from './components/project/project-create/project-create.component';
import { ProjectIndexComponent } from './components/project/project-index/project-index.component';
import { ProjectUpdateComponent } from './components/project/project-update/project-update.component';
import { ProjectDeleteComponent } from './components/project/project-delete/project-delete.component';

import { CustomerCreateComponent } from './components/customer/customer-create/customer-create.component';
import { CustomerIndexComponent } from './components/customer/customer-index/customer-index.component';
import { CustomerUpdateComponent } from './components/customer/customer-update/customer-update.component';
import { CustomerDeleteComponent } from './components/customer/customer-delete/customer-delete.component';
import { DepartmentDescribeComponent } from './department-describe/department-describe.component';
import { OrgChartComponent } from './department-describe/org-chart/org-chart.component';
import { SqlDocsComponent } from './components/docs/BackEnd/sqlServer/sql-docs/sql-docs.component';
import { NodeComponentComponent } from './components/docs/env/node-component/node-component.component';
import { DepartmenIndexComponentComponent } from './components/department/departmen-index/departmen-index-component/departmen-index-component.component';
import { DepartmentCreateComponentComponent } from './components/department/departmen-create/department-create-component/department-create-component.component';
import { DepartmentUpdateComponentComponent } from './components/department/departmen-update/department-update-component/department-update-component.component';
import { DepartmentDeleteComponentComponent } from './components/department/departmen-delete/department-delete-component/department-delete-component.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ExpertProfileComponent } from './components/expert-profile/expert-profile.component';

export const routes: Routes = [
  // Login Route
  { path: 'login', component: LoginComponent },

  // Dashboard Route with Child Routes
  {
    path: 'dashboard', component: DashboardComponent, children: [

      {path:'navbar',component: NavbarComponent},

      // Employee Routes
      { path: 'employee', component: EmployeeIndexComponent },
      { path: 'employee/create', component: EmployeeCreateComponent },
      { path: 'employee/update/:id', component: EmployeeUpdateComponent },
      { path: 'employee/delete/:id', component: EmployeeDeleteComponent },
      { path: 'employee/expertProfile/:id', component: ExpertProfileComponent },


      // Project Routes
      { path: 'project', component: ProjectIndexComponent },
      { path: 'project/create', component: ProjectCreateComponent },
      { path: 'project/update/:id', component: ProjectUpdateComponent },
      { path: 'project/delete/:id', component: ProjectDeleteComponent },

      // Customer Routes
      { path: 'customer', component: CustomerIndexComponent },
      { path: 'customer/create', component: CustomerCreateComponent },
      { path: 'customer/update/:id', component: CustomerUpdateComponent },
      { path: 'customer/delete/:id', component: CustomerDeleteComponent },

      {path: 'department', component: DepartmenIndexComponentComponent},
      {path: 'department/create',component: DepartmentCreateComponentComponent},
      {path: 'department/update/:id', component: DepartmentUpdateComponentComponent},
      {path: 'department/delete/:id', component: DepartmentDeleteComponentComponent},

      {path: 'overview', component: DepartmentDescribeComponent},
      {path: 'overview/orgchart', component: OrgChartComponent},

      {path: 'docs/sql', component: SqlDocsComponent},
      {path: 'docs/node', component: NodeComponentComponent}

    ]
  },

  // Redirect to login if no path is matched
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
