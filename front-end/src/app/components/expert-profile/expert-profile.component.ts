import { Component, OnInit } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { EmployeeServiceService } from '../employee/service/employee-service.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
  id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
  skills: string[];
  role: string;
  aboutMe:string;
  is_admin: boolean;
  project: {name: string,id:string} |null;
  department: {name: string , id: string}|null;
}

@Component({
  selector: 'app-expert-profile',
  standalone: true,
  imports: [QuillModule,RouterModule,CommonModule,FormsModule],
  templateUrl: './expert-profile.component.html',
  styleUrl: './expert-profile.component.scss'
})
export class ExpertProfileComponent implements OnInit {
  constructor (
    private employeeService:EmployeeServiceService,
    private route: ActivatedRoute
  )
  {}
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
    is_admin: false,
    project: {name: '', id: ''},
    department: {name: '', id: ''}
  };
  id: string = ''
  ngOnInit(): void {
    const id  = this.route.snapshot.paramMap.get('id')
    if (id)
    {
      this.employeeService.getEmployeeWithApiCall(id).subscribe(
        (data) => {
          this.employee = data
        }
      )
    }
  }
}
