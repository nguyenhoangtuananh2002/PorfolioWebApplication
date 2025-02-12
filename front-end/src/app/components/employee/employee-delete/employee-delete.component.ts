import { Component } from '@angular/core';
import { EmployeeServiceService } from '../service/employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';
interface Employee {
  id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  email: string;
  birthday: string;
  skills: string;
  role: string;
  is_admin: boolean;
}
@Component({
  selector: 'app-employee-delete',
  imports: [],
  templateUrl: './employee-delete.component.html',
  styleUrl: './employee-delete.component.scss'
})
export class EmployeeDeleteComponent {
  employee: Employee = {
    id: '',
    avatar: '',
    firstname: '',
    lastname: '',
    email: '',
    birthday: '',
    skills: '',
    role: '',
    is_admin: false,
  }
  constructor(
    private employeeService: EmployeeServiceService,
    private route: ActivatedRoute,
    private router: Router,
  ){}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
    {
      this.employeeService.deleteEmployeeWithApiCall(id).subscribe(
        () => {
          this.router.navigate(['/dashboard/employee'])
        }
      )

    }
    }

}
