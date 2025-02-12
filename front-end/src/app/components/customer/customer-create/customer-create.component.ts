import { Component } from '@angular/core';
import { CustomerServiceService } from '../service/customer-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Customer {
  id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
}
@Component({
  selector: 'app-customer-create',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.scss'
})
export class CustomerCreateComponent {
  constructor(
    private CustomerService: CustomerServiceService,
    private router: Router,
  ) {}
  customer : Customer = {
    id: '',
    avatar: '',
    firstname: '',
    lastname: '',
    gender: '',
    email: ''
  }
  addCustomer() {
    this.CustomerService.createCustomerWithApiCall(this.customer).subscribe(
      (response) => {
        this.router.navigate(['/dashboard/customer'])
      }
    )
  }


}
