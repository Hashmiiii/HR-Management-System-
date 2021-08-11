import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';import { BadInput } from './../../ErrorModels/AuthenticationErrors/BadInput';
import { AuthenticationError } from './../../ErrorModels/AuthenticationErrors/AuthenticationError';
import { CompanyService } from './../../services/company.service';
import { Company } from './../../Models/Company';
import { Subject } from "rxjs/Rx";

@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<DataTables.Settings> = new Subject<DataTables.Settings>();

  public company : Company[]=[];

  constructor(private service: CompanyService, 
              private router:  Router) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    this.service.getCompanyList()
    .subscribe(companyList => {
      this.company=companyList;
      this.dtTrigger.next();
      //console.log(this.company);
    }, (error: AuthenticationError) => {
      console.log(error);
    });
  }

  editCompany(companyId: string)
  {
    this.router.navigate(["/editcompany", btoa(companyId)]); 
    //console.log(companyId);
  }

  markUnpaid()
  {
    if(confirm("Do you want to Mark All Companies as Unpaid?"))
    {
      this.service.markUnpaid()
      .subscribe(companyList => {
        location.reload();
        //this.router.navigateByUrl('/company');
        //console.log(this.company);
      }, (error: AuthenticationError) => {
        console.log(error);
      });
    }
  }

}
