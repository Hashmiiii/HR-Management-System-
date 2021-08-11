import { Company } from './../Models/Company';
import { AuthenticationError } from './../ErrorModels/AuthenticationErrors/AuthenticationError';
import { BadInput } from './../ErrorModels/AuthenticationErrors/BadInput';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { BaseURL } from "../Constants/ServiceConstatnt";

@Injectable()
export class CompanyService {
  private ControllerName = "Company/";
  private url: string 
  private header : Headers;
  constructor(private http: Http) {
    this.url=BaseURL.toString().concat(this.ControllerName);
    this.header = new Headers();
    this.header.append('Content-Type', 'application/json');
    this.header.append( 'Access-Control-Allow-Origin','*');
   }

    addNewCompany(companyModel: Company)
    {
      return this.http.post(this.url.concat("AddNewCompany"), JSON.stringify(companyModel), {headers: this.header})
      .map(Response => Response.json())
      .catch(this.handleError);
    }

    editACompany(companyModel: Company)
    {
      //console.log(JSON.stringify(companyModel));
      return this.http.post(this.url.concat("EditACompany"), JSON.stringify(companyModel), {headers: this.header})
      .map(Response => Response.json())
      .catch(this.handleError);
    }

    getCompanyByCompanyId(companyId: string)
    {
      return this.http.get(this.url.concat("GetCompanyById?companyId=",companyId))
      .map(Response => Response.json())
      .catch(this.handleError);
    }

    getCompanyList()
    {
      return this.http.get(this.url.concat("getCompanyList"))
      .map(Response => Response.json())
      .catch(this.handleError);
    }

    markUnpaid()
    {
      return this.http.post(this.url.concat("markCompaniesUnpaid"), "", {headers: this.header})
      .map(Response => Response.json())
      .catch(this.handleError);
    }

   private handleError(error: Response)
   {
    
      if (error.status === 406)
        return Observable.throw(new BadInput(error.json()));
      if (error.status === 403)
        return Observable.throw(new BadInput(error.json()));
      
      return Observable.throw(new AuthenticationError(error.json()));
    
   }

}
