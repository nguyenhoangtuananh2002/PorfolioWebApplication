import { Component, OnInit } from '@angular/core';
import { DepartmentServiceService } from '../../service/department-service.service';
import { EmployeeServiceService } from '../../../employee/service/employee-service.service';
import { ActivatedRoute,Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Department {
  id: string,
  name: string,
  overview: string,
  createdAt: string,
}


@Component({
  selector: 'app-department-update-component',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './department-update-component.component.html',
  styleUrl: './department-update-component.component.scss'
})
export class DepartmentUpdateComponentComponent implements OnInit {
  constructor(
    private departmentService: DepartmentServiceService,
    private router: Router,
    private route: ActivatedRoute
  ){
  }
  department: Department = {
    id: '',
    name: '',
    overview: '',
    createdAt: ''  }

  id: string = '';


  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id')
      if(id)
      {
        this.departmentService.getDepartmentWithApiCall(id).subscribe(
          (data) =>
          {
            this.department = data;
            this.department.createdAt = new Date(Number(this.department.createdAt)).toString()
            this.id = data.id
          }
        )
      }
  }
  updateDepartment() {
    this.departmentService.updateDepartmentWithApiCall(this.id,this.department).subscribe(
      () => {

        this.router.navigate(['/dashboard/department'])
      }
    )
  }
}
