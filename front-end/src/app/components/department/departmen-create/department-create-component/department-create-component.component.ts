import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { DepartmentServiceService } from '../../service/department-service.service';
import { EmployeeServiceService } from '../../../employee/service/employee-service.service';
import { ProjectServiceService } from '../../../project/service/project-service.service';

interface Department {
  id: string,
  name: string,
  overview: string,
  createdDate: string
}

@Component({
  selector: 'app-department-create-component',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './department-create-component.component.html',
  styleUrl: './department-create-component.component.scss'
})
export class DepartmentCreateComponentComponent {
  newDepartment: Department = {
    id: '',
    name: '',
    overview: '',
    createdDate: '',

  }
  departments: Department[] = [];

  constructor(
    private departmentService: DepartmentServiceService,
    private router: Router,
  ){}

  addDepartment() : void {
    const created_at = new Date()
    this.newDepartment.createdDate = created_at.getTime().toString();
    this.departmentService.createDepartmentWithApiCall(this.newDepartment).subscribe(
      () => {
        console.log(this.newDepartment.createdDate)
        console.log(typeof(this.newDepartment.createdDate))
        this.router.navigate(['/dashboard/department'])
      }
    )
  }

}
