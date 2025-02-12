import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { map } from 'rxjs/operators'

interface Department {
  id: string,
  name: string,
  overview: string,
  createdAt: string,
}
@Injectable({
  providedIn: 'root'
})
export class DepartmentServiceService {

  private localStorageKey = 'departments';
  private api_url ='http://localhost:3000/departments'
  constructor(private http: HttpClient){}

  //FOR API CALL
  getDepartmentsWithApiCall(): Observable<Department[]> {
    return this.http.get<Department[]>(this.api_url)
  }

  getDepartmentWithApiCall(id: string): Observable<Department> {
    const url = `${this.api_url}/${id}`;
    return this.http.get<Department>(url)
  }

  createDepartmentWithApiCall(department: any): Observable<Department>
  {
    department.id = uuidv4()
    const created_date = new Date()
    department.createdAt = created_date.getTime().toString()
    return this.http.post<any>(this.api_url,department)
  }

  updateDepartmentWithApiCall(id: string, updateDepartment: any): Observable<Department> {
    const api_url = `${this.api_url}/${id}`
    return this.http.patch<any>(api_url,updateDepartment)
  }

  deleteDepartmentWithApiCall(id: string) : Observable<Department> {
    return this.http.delete<any>(`${this.api_url}/${id}`)
  }


  //FOR LOCAL STORAGE
  getDepartmentFromLocalStorage() {
    const departments = localStorage.getItem('departments')
    return departments ? JSON.parse(departments) : []
  }

  saveDepartmentToLocalStorage(department: any) {
    const department_json = JSON.stringify(department)
    localStorage.setItem(this.localStorageKey,department_json)
  }

  getDepartments(): Observable<Department[]>
  {
    const departments = this.getDepartmentFromLocalStorage()
    return of(departments)
  }
  createDepartment(newDepartment: Department): Observable<Department>
  {
    const departments = this.getDepartmentFromLocalStorage()
    newDepartment.id = uuidv4()
    // newDepartment.createdDate = new Date();
    departments.push(newDepartment)
    this.saveDepartmentToLocalStorage(departments)
    return of(departments)
  }

  updateDepartment(updateDepartment: Department): Observable<Department>
  {
    const  departments = this.getDepartmentFromLocalStorage().map((department: Department) => department.id === updateDepartment.id ? updateDepartment : department );
    localStorage.setItem('departments',JSON.stringify(departments))
    return of(departments)
  }

  deleteDepartment(id: string) : Observable<Department>
  {
    const deletedDepartment = this.getDepartmentById(id)
    const departments = this.getDepartmentFromLocalStorage().filter((department: Department) => department.id !== id)
    this.saveDepartmentToLocalStorage(departments)
    return of(deletedDepartment)

  }

  getDepartmentById(id: string) {
    const departments = this.getDepartmentFromLocalStorage()
    return departments.find((department: Department) => department.id === id)
  }
}






