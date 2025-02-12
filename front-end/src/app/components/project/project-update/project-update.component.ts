import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from '../service/project-service.service';
import { ActivatedRoute,Route,Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeServiceService } from '../../employee/service/employee-service.service';
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
  createdAt: string;
  lastUpdatedat: string;
  department: Department;
  customer: Customer;
  employees: Employee[]
}

interface Department {
  id: string;
  name: string;
  overview: string;
}

interface Customer {
  id: string;
  firstname: string;
  lastname: string;
}

@Component({
  selector: 'app-project-update',
  standalone:true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './project-update.component.html',
  styleUrl: './project-update.component.scss'
})
export class ProjectUpdateComponent implements OnInit {
constructor(
  private projectService: ProjectServiceService,
  private customerService: CustomerServiceService,
  private departmentService: DepartmentServiceService,
  private route: ActivatedRoute,
  private router: Router,
){}
customers: Customer[] = []
employees: Employee[] = []
departments: Department[] =[]
selectedEmployees: string[] = [];
id: string = '';

project: Project = {
  id: '',
  name: '',
  department: { id: '', name: '' ,overview: ''},
  customer: { id: '', firstname: '', lastname: '' },
  employees: [],
  requirements: '',
  skills: [],
  result_image: [],
  project_start_date: '',
  project_end_date: '',
  createdAt: '',
  lastUpdatedat: '',
};

skillsString: string =''
ngOnInit(): void {
  this.loadCustomers()
  this.loadDepartment()
  
    const id = this.route.snapshot.paramMap.get('id')
    if(id)
    {
      this.id = id
      this.projectService.getProjectWithApiCall(id).subscribe(
        (response : any) => {
          if(response)
          {
            this.project = response
            this.employees = response.employees
            this.project.project_start_date = new Date(Number(this.project.project_start_date)).toISOString().split('T')[0];
            this.project.project_end_date = new Date(Number(this.project.project_end_date)).toISOString().split('T')[0];
            this.skillsString = this.project.skills.join(',')
            console.log(this.project.skills)
          }
        }
      )
    }

}

loadCustomers(){
  this.customerService.getCustomersWithApiCall().subscribe(
    (customersData: Customer[]) => {
      this.customers = customersData
    }
  )
}

loadDepartment(){
  this.departmentService.getDepartmentsWithApiCall().subscribe(
    (departmentsData: Department[]) => {
      this.departments = departmentsData
    }
  )
}

updateProject() {
  this.project.skills = this.skillsString.split(',').map(skill=> skill.trim())
  this.projectService.updateProjectWithApiCall(this.id,this.project).subscribe(
    () => {
      this.router.navigate(['/dashboard/project'])
    }
  )
}

}
