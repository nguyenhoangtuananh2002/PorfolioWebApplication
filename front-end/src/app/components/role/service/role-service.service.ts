import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export enum Privilege {
  User = 'user',
  Admin = 'admin',
  SuperAdmin = 'superAdmin'

}

interface Role {
  id: string;
  name: string;
  privilege: Privilege;
}
@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  constructor( private http: HttpClient) { }

  private api_url = 'http://localhost:3000/role'

  getRolesWithApiCall(): Observable<Role[]>{
    return this.http.get<Role[]>(this.api_url)
  }

  getRoleWithApiCall(id: string): Observable<Role> {
    const api_url = `http://localhost:300/role/${id}`
    return this.http.get<Role>(api_url)
  }

  createRoleWithApiCall(newRole: any): Observable<Role>{
    newRole.id = uuidv4()
    return this.http.post<Role>(newRole,this.api_url)
  }
}
