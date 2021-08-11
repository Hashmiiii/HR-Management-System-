import { EmployeeTypeOwner, usernameCookie, EmployeeTypeCookie } from './../../Constants/ApplicationConstants';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NavbarService } from './../../services/navbar-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private navService : NavbarService,
              private router:  Router,
              private cookieservice : CookieService) {}

  ngOnInit() {
    if(this.cookieservice.check(usernameCookie))
    {
      this.navService.showNavbar = true; 
    }
    if(this.cookieservice.check(EmployeeTypeCookie))
    {
      this.navService.employeeType = this.cookieservice.get(EmployeeTypeCookie);
    }
  }

  logout()
  {
    this.router.navigate(['/login']);
  }

}
