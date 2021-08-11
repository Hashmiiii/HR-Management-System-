import { EmployeeTypeOwner, usernameCookie, EmployeeTypeCookie } from './../Constants/ApplicationConstants';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class EnsureAuthenticated implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}
  canActivate(): boolean {
    if (this.cookieService.check(usernameCookie) && this.cookieService.check(EmployeeTypeCookie)) {
      if(this.cookieService.get(EmployeeTypeCookie) == EmployeeTypeOwner)
      {
        return true;  
      }
      else
      {
        this.router.navigateByUrl('/login');
        return false;
      }
    }
    else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}