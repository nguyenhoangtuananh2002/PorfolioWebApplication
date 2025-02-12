import { Component, OnInit } from '@angular/core';
import { CustomerServiceService } from '../service/customer-service.service';
import { ActivatedRoute, Router } from '@angular/router';
interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}
@Component({
  selector: 'app-customer-delete',
  imports: [],
  templateUrl: './customer-delete.component.html',
  styleUrl: './customer-delete.component.scss'
})
export class CustomerDeleteComponent implements OnInit{

customer: Customer = {
  id: '',
  firstname: '',
  lastname: '',
  email: '',
}
id: string = ''
constructor(
  private customerService: CustomerServiceService,
  private route: ActivatedRoute,
  private router: Router,
){}
ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id)
    {
      this.customerService.getCustomerByIdWithApiCall(id)
      this.customerService.deleteCustomerWithApiCall(id).subscribe(
        () => {
          this.router.navigate(['/dashboard/customer'])
        }
      )
    }
}
}
