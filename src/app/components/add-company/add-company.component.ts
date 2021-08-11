import { BadInput } from './../../ErrorModels/AuthenticationErrors/BadInput';
import { AuthenticationError } from './../../ErrorModels/AuthenticationErrors/AuthenticationError';
import { CompanyService } from './../../services/company.service';
import { Company } from './../../Models/Company';
import { Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  public companyModel : Company;
  public company : Company;

  constructor(private companyService: CompanyService,
    private router:  Router,
    private spinnerservice : Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.companyModel = new Company();
    this.companyModel.IsActive = "1";
    this.companyModel.isMonthlyChargesPaid = "1";
    this.company = new Company();
  }

  addCompany()
  {
    this.spinnerservice.show();
    this.company.CompanyUsername=btoa(this.companyModel.CompanyUsername);
    this.company.CompanyName=btoa(this.companyModel.CompanyName);
    this.company.PerEmployeeRate=btoa(this.companyModel.PerEmployeeRate);
    this.company.Password=btoa(this.companyModel.Password);
    this.company.IsActive=btoa(this.companyModel.IsActive);
    this.company.IsActive=btoa(this.companyModel.isMonthlyChargesPaid);

    this.companyService.addNewCompany(this.company)
    .subscribe(data => {
      this.spinnerservice.hide();
      //console.log('hello');
      this.router.navigate(['/company']);
    },
    (error: AuthenticationError)=>{
      if(error instanceof BadInput)
      {      
        console.log(error.error['Message']);
      }
      else
      {
        console.log(error.error['Message']);
      }
      
    });
    this.spinnerservice.hide();
    //console.log(btoa(this.loginModel.UserName));
  }

}
