import { NavbarService } from './../../services/navbar-service.service';
import { EmployeeTypeAdmin, EmployeeTypeOwner, EmployeeTypeEmployee, usernameCookie, EmployeeTypeCookie } from './../../Constants/ApplicationConstants';
import { CookieService } from 'ngx-cookie-service';
import { BadInput } from './../../ErrorModels/AuthenticationErrors/BadInput';
import { AuthenticationError } from './../../ErrorModels/AuthenticationErrors/AuthenticationError';
import { LoginService } from './../../services/login.service';
import { Login } from './../../Models/Login';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
//import { Ng4LoadingSpinnerService } from "ng4-loading-spinner/ng4LoadingSpinner.service";
//import { Ng4LoadingSpinnerService } from "ng4-loading-spinner/ng4-loading-spinner";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginModel : Login = new Login();
  private login: Login = new Login();
  public isFormValid: boolean = true;
  constructor(private service: LoginService, 
              private cookieService: CookieService, 
              private router:  Router,
              private spinnerService: Ng4LoadingSpinnerService,
              private navService : NavbarService) {
   }

  ngOnInit() {
    this.cookieService.deleteAll();
    this.navService.showNavbar = false;
    this.navService.employeeType = "";
  }

  public LoginUser()
  {
    this.spinnerService.show();
    this.isFormValid = true;
    this.login.UserName=btoa(this.loginModel.UserName);
    this.login.Password=btoa(this.loginModel.Password);
    this.service.authenticateUser(this.login)
    .subscribe(data => {
      this.spinnerService.hide();
      var date=new Date();
      date.setMinutes(date.getMinutes()+10);
      this.cookieService.set( usernameCookie, btoa(this.login.UserName), date );
      this.cookieService.set( EmployeeTypeCookie, (data as string), date );
      this.navService.showNavbar = true;
      this.navService.employeeType = data;
      if(data == EmployeeTypeOwner)
      {
        this.router.navigate(["/company"]);  
      }
      if(data == EmployeeTypeAdmin)
      {
        this.router.navigate(["/admin"]);  
      }
      if(data == EmployeeTypeEmployee)
      {
        this.router.navigate(["/employee"]);  
      }
    },
    (error: AuthenticationError)=>{
      this.spinnerService.hide();
      this.isFormValid = false;
      
    });
    //console.log(btoa(this.loginModel.UserName));
  }

}
