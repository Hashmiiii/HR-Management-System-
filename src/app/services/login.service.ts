import { AuthenticationError } from './../ErrorModels/AuthenticationErrors/AuthenticationError';
import { BadInput } from './../ErrorModels/AuthenticationErrors/BadInput';
import { Login } from './../Models/Login';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import { BaseURL } from "../Constants/ServiceConstatnt";

@Injectable()
export class LoginService {
  private ControllerName = "Authentication/";
  private url: string 
  private header : Headers;
  constructor(private http: Http) {
    this.url=BaseURL.toString().concat(this.ControllerName);
    this.header = new Headers();
    this.header.append('Content-Type', 'application/json');
    this.header.append( 'Access-Control-Allow-Origin','*');
   }

   authenticateUser(login : Login)
   {
      return this.http.post(this.url.concat("AuthenticateUser"), JSON.stringify(login), {headers: this.header})
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
