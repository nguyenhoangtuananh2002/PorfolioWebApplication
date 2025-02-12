import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../../login/login-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

  constructor(private route: Router){}

  user: any = {}
  ngOnInit(): void {
    if(this.getUser())
    {
      this.route.navigate(['/dashboard/overview'])
    }
  }
  activeMenu: string | null = null;
  getUser(){
    const userData = sessionStorage.getItem('User')
    if(userData)
    {
      this.user = JSON.parse(userData)
      return true
    }
    return false
  }
  toggleSubmenu(menu: string): void {
    this.activeMenu = this.activeMenu === menu ? null : menu;
  }

}
