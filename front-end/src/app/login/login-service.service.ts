import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

interface Login {
  email: string ;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private url = 'http://localhost:3000/auth/login'
  constructor(private http: HttpClient) {}

  login(email: string, password:string){
    return this.http.post<Login>(this.url,{email,password})
  }

  saveSession(data:any)
  {
    sessionStorage.setItem('JwtToken',JSON.stringify(data.access_token))
    return true
  }

  getSession(){
    const data = sessionStorage.getItem('JwtToken')
    if (data)
    {
      console.log("Data JWT is : ", data)
      const user_info = jwtDecode(data)
      console.log("Decoded Data Is : " ,user_info)
      sessionStorage.setItem('User',JSON.stringify(user_info))
      return true
    }
    else{
      return false
    }
  }

  logout(){
    sessionStorage.removeItem('JwtToken')
  }

}
