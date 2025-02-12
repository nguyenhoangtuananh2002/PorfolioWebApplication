import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../service/employee-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  selector: 'app-employee-index',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './employee-index.component.html',
  styleUrls: ['./employee-index.component.scss']
})
export class EmployeeIndexComponent implements OnInit {
  employees: Employee[] = [];
  searchText: string = '';
  constructor(private employeeService: EmployeeServiceService) {

  }

  ngOnInit(): void {
    const loggedUser = sessionStorage.getItem('U')
    this.employeeService.getEmployeesWithApiCall().subscribe((data : Employee[]) => {
      this.employees = data;
      console.log("list of emps" ,this.employees)
    });
  }

  filterEmployee(): Employee[] {
    if(!this.searchText)
    {
      return this.employees
    }
    const search = this.searchText.toLowerCase().trim();
    return this.employees.filter(
      emp => {
        const projectNameMatches = emp.project && emp.project.name.toLowerCase().includes(search)
        return this.isEmployeeMatch(emp,search) || projectNameMatches
      }
    )
  }
  isEmployeeMatch(employee:Employee,search: string): boolean {
    for(let key in employee)
    {
      const value = employee[key as keyof Employee];
      if(typeof(value)=== 'string')
      {
        if(value.toLowerCase().includes(search))
        {
          return true
        }
      }
      else if ( Array.isArray(value))
      {
        for(let item of value)
        {
          if(item.toLowerCase().includes(search))
          {
            return true
          }
        }
      }
    }
    return false
  }

}
