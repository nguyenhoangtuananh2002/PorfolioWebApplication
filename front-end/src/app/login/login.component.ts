import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeServiceService } from '../components/employee/service/employee-service.service';
import { LoginServiceService } from './login-service.service';
interface Employee {
  email: string;
  password:string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  constructor(
    private router:Router,
    private loginService: LoginServiceService
  ){}
  email: string ='';
  password: string ='';
  showError: string = '';

  onSubmit(): void
  {
    this.showError = ''
    if (this.email === null || this.email === undefined || this.email.trim() === '')
    {
      this.showError = 'Please Input Your Email'
      return
    }
    else if ( this.password === null || this.password === undefined || this.password.trim() === '')
    {
      this.showError = 'Please Input Your Password'
      return
    }
    this.loginService.login(this.email,this.password).subscribe(
      (response) => {
        console.log("login successfull ", response)
        if(this.loginService.saveSession(response) && this.loginService.getSession())
        {
          window.location.href = '/dashboard/overview'
        }
      },
      error => {
        this.showError = "Invalid login"
        return
      }
    )
  }
}
