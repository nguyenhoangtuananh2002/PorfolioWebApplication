import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

interface Customer {
  id: string;
  avatar: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: string
}
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  constructor(private http:HttpClient) {}

  private api_url = 'http://localhost:3000/customers'


  getCustomersWithApiCall() {
    return this.http.get<any>(this.api_url)
  }
  getCustomerByIdWithApiCall(id: string){
    const url = `${this.api_url}/${id}`;
    return this.http.get<Customer>(url)
  }
  createCustomerWithApiCall(customer:Customer): Observable<any>
  {
    customer.id = uuidv4()
    return this.http.post(this.api_url,customer)
  }

  updateCustomerWithApiCall(id:string,updatedCustomer:Customer): Observable<any>
  {
    const url = `${this.api_url}/${id}`
    return this.http.patch(url,updatedCustomer)
  }
  deleteCustomerWithApiCall(id:string): Observable<any>
  {
    const url = `${this.api_url}/${id}`
    return this.http.delete(url)
  }

  }

