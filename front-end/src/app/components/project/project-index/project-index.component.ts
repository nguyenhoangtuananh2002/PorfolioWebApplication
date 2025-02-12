import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../service/project-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomerServiceService } from '../../customer/service/customer-service.service';
import { DepartmentServiceService } from '../../department/service/department-service.service';

interface Employee {
  id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
  skills: string[];
  role: string;
  is_admin: boolean;

}

interface Project {
  id: string;
  name: string;
  requirements: string;
  skills: string[];
  result_image: string[];
  project_start_date: string;
  project_end_date: string;
  lastUpdatedat: string;
  department: Department;
  customer: Customer;
  createdAt : string;
  endAt: string;
  employees: Employee[]

}

interface Department {
  id: string;
  name: string;
}

interface Customer {
  id: string;
  firstname: string;
  lastname: string;
}


@Component({
  selector: 'app-project-index',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './project-index.component.html',
  styleUrl: './project-index.component.scss'
})
export class ProjectIndexComponent implements OnInit {

  projects: Project[] = []
  employees: Employee[] = []
  isFormVisible: boolean = false
  currentRequirements: string = ''
  todayDate: Date = new Date();
  formatTodayDate: string = this.todayDate.toLocaleDateString('en-CA')
  customers : Customer[] = [];
  departments : Department[] = [];
  customerProject: string = '';
  departmentProject: string = '';

  constructor(
    private projectService: ProjectServiceService,
    private customerService: CustomerServiceService,
    private departmentService : DepartmentServiceService,
  ){}
  ngOnInit(): void {
      this.projectService.getProjectsWithApiCall().subscribe(
        (data) => {
          this.projects = data.map(project => ({
            ...project,
            createdAt: new Date(Number(project.project_start_date)).toLocaleDateString(),
            endAt: new Date(Number(project.project_end_date)).toLocaleDateString()
            
          }))
        }
        
      )
      this.customerService.getCustomersWithApiCall().subscribe(
        (customersData) => {
          this.customers = customersData
        }
      )
      this.departmentService.getDepartmentsWithApiCall().subscribe(
        (departmentsData) => {
          this.departments = departmentsData
        }
      )
  }

showForm(requirements: string) : void{
  this.currentRequirements = requirements
  this.isFormVisible = !this.isFormVisible
  if (this.isFormVisible == true)
  {
    console.log(this.todayDate)
  }
  else
  {
    console.log('form is closed')
  }
}


}
