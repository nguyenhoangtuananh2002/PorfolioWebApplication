import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmployeeServiceService } from '../service/employee-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProjectServiceService } from '../../project/service/project-service.service';
import { HttpClient } from '@angular/common/http';
import { DepartmentServiceService } from '../../department/service/department-service.service';

interface UploadResponse {
  message: string;
  filename: string;
}
interface Employee {
  id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  aboutMe:string;
  gender: string;
  email: string;
  password:string;
  skills: string[];
  role: string;
  is_admin: boolean;
  project: Project;
  department: {id: string, name: string}|null

}

interface Project {
  id: string;
  name: string;
}

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
})
export class EmployeeCreateComponent implements OnInit {
  employees: Employee[] = [];
  projects: { id: string; name: string }[] = [];
  departments: {id: string ; name: string}[] = [];
  newEmployee = {
    id: '',
    avatar: '',
    firstname: '',
    lastname: '',
    gender: '',
    aboutMe: '',
    email: '',
    password: '',
    skills: [],
    role: '',
    is_admin: false,
    project: { id: '', name: '' },
    department: {id: '',name: ''}
  };
  avatarFile: File | null = null;
  avatarPreview: string |null = null

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private employeeService: EmployeeServiceService,
    private http: HttpClient,
    private projectService: ProjectServiceService,
    private departmentService: DepartmentServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectService.getProjectsWithApiCall().subscribe((projectsData) => {
      this.projects = projectsData;
    });
    this.departmentService.getDepartmentsWithApiCall().subscribe(
      (departmentsData) => {
        this.departments = departmentsData
      }
    )
  }

  onFileSelect(event: any): void {
    const file:File = event.target.files[0];
    if(file){
      const formData = new FormData();
      formData.append('file',file,file.name)
      this.http.post<UploadResponse>('http://localhost:3000/upload-picture/upload', formData).subscribe(
        (response) => {
          console.log(response)
          this.newEmployee.avatar = response.filename
          console.log("Emp avatar: ",this.newEmployee.avatar)
          this.avatarPreview = `http://localhost:3000/upload-picture/${response.filename}`
        }
      )
    }
  }

  addEmployee(): void {
      this.employeeService.createEmployeeWithApiCall(this.newEmployee).subscribe(
        (data) => {
          console.log(data)
          this.router.navigate(['/dashboard/employee']);
        }
      );
  }
}
