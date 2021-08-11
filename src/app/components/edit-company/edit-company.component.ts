import { NavbarService } from './../../services/navbar-service.service';
import { BadInput } from './../../ErrorModels/AuthenticationErrors/BadInput';
import { AuthenticationError } from './../../ErrorModels/AuthenticationErrors/AuthenticationError';
import { CompanyService } from './../../services/company.service';
import { Company } from './../../Models/Company';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  public companyModel : Company;
  public company : Company;

  constructor(private companyService: CompanyService,
              private activeRoute: ActivatedRoute,
              private router:  Router,
              private spinnerservice : Ng4LoadingSpinnerService)
  {

  }

  ngOnInit() {
    this.spinnerservice.show();
    this.companyModel = new Company();
    this.company = new Company();
    //this.companyModel.CompanyId = "8";

    this.activeRoute.paramMap
    .subscribe(params =>{
      this.companyModel.CompanyId = atob(params.get('companyId'));
    });

    this.companyService.getCompanyByCompanyId(btoa(this.companyModel.CompanyId))
    .subscribe(data => {
      this.companyModel.CompanyName = data['CompanyName'];
      this.companyModel.IsActive = data['IsActive'];
      this.companyModel.PerEmployeeRate = data['PerEmployeeRate'];
      this.companyModel.isMonthlyChargesPaid = data['isMonthlyChargesPaid'];
    }, (error : AuthenticationError) => {
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
  }

  editCompany()
  {
    this.spinnerservice.show();
    //console.log(this.companyModel);
    //console.log(this.companyModel.CompanyId);
    this.company.CompanyId=btoa(this.companyModel.CompanyId);
    this.company.CompanyName=btoa(this.companyModel.CompanyName);
    this.company.PerEmployeeRate=btoa(this.companyModel.PerEmployeeRate);
    this.company.IsActive=btoa(this.companyModel.IsActive);
    this.company.isMonthlyChargesPaid=btoa(this.companyModel.isMonthlyChargesPaid);

    this.companyService.editACompany(this.company)
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
