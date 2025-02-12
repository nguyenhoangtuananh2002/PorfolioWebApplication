import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../service/employee-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectServiceService } from '../../project/service/project-service.service';
import { HttpClient } from '@angular/common/http';
import { DepartmentServiceService } from '../../department/service/department-service.service';
import { AngularEditorModule, AngularEditorConfig } from '@kolkov/angular-editor';
import e from 'cors';

interface Employee {
  id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  email: string;
  aboutMe: string;
  gender: string;
  skills: string[];
  role: string;
  password: string;
  is_admin: boolean;
  project: {name: string, id: string} | null;
  department: {name: string, id: string} | null;
}

interface UploadResponse {
  message: string;
  filename: string;
}

@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, AngularEditorModule],
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit, OnDestroy {
  projects: { id: string; name: string }[] = [];
  departments: {id: string; name: string}[] = [];
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '200px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: false,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']]
  };
  employee: Employee = {
    id: '',
    avatar: '',
    firstname: '',
    lastname: '',
    gender: '',
    aboutMe: '',
    email: '',
    skills: [],
    role: '',
    password: '',
    is_admin: false,
    project: {name: '', id: ''},
    department: {name: '', id: ''}
  };
  id: string = '';
  avatarFile: File | null = null;
  avatarPreview: string | null = null;
  passwordRepeat: string ='';

  constructor(
    private employeeService: EmployeeServiceService,
    private projectService: ProjectServiceService,
    private departmentService: DepartmentServiceService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  onFileSelect(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      this.http.post<UploadResponse>('http://localhost:3000/upload-picture/upload', formData).subscribe(
        (response) => {
          this.employee.avatar = response.filename;
          this.avatarPreview = `http://localhost:3000/upload-picture/${response.filename}`;
        }
      );
    }
  }

  ngOnInit(): void {
    this.loadProject();
    this.loadDepartment();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeWithApiCall(id).subscribe(
        (data) => {
          this.employee = data;
          if (!this.employee.project) {
            this.employee.project = {id: '', name: ''};
          }
          this.id = id;
        }
      );
    }
  }

  ngOnDestroy(): void {}

  updateEmployee(): void {
    // if (this.employee.password && this.passwordRepeat !== this.employee.password)
    // {
    //   alert("Password is not match " + this.employee.password + " and" + this.passwordRepeat )
    //   return
    // }
    this.employeeService.updateEmployeeWithApiCall(this.id, this.employee).subscribe(
      (data) => {
        this.router.navigate(['/dashboard/employee']);
      }
    );
  }

  loadProject(): void {
    this.projectService.getProjectsWithApiCall().subscribe(
      (projectData) => {
        this.projects = projectData;
      }
    );
  }

  loadDepartment(): void {
    this.departmentService.getDepartmentsWithApiCall().subscribe(
      (departmentData) => {
        this.departments = departmentData;
      }
    );
  }
}
