import { EmployeeTypeOwner } from './../Constants/ApplicationConstants';
import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  public showNavbar : boolean;
  public employeeType : string;
  constructor() {
    this.showNavbar = false;
    this.employeeType = EmployeeTypeOwner;

   }

}
