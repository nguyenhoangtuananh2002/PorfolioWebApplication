import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerServiceService } from '../service/customer-service.service';
import { FormsModule } from '@angular/forms';

interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  gender: string;
  email: string;
}
@Component({
  selector: 'app-customer-index',
  standalone: true,
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './customer-index.component.html',
  styleUrl: './customer-index.component.scss'
})
export class CustomerIndexComponent implements OnInit {

  customers: Customer[] = []
  constructor(private customerService: CustomerServiceService)
  {}
  searchText: string = ''

  ngOnInit(): void {
    this.customerService.getCustomersWithApiCall().subscribe(
      (data: Customer[]) => {
        this.customers = data
      }
    )
  }
  filterCustomers(): Customer[] {
    if (!this.searchText) {
      return this.customers;
    }
    return this.customers.filter(customer =>
      Object.values(customer).some(value =>
        value.toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
}

}
