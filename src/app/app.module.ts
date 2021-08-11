import { FileUploadService } from './file-upload.service';
import { EnsureAuthenticated } from './services/ensure-authenticated.service';
import { NavbarService } from './services/navbar-service.service';
import { Company } from './Models/Company';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { DataTablesModule } from 'angular-datatables';
import { LoginService } from './services/login.service';
import { CompanyService } from './services/company.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CollapseModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { CookieService } from 'ngx-cookie-service';
import { NotFoundComponent } from './not-found/not-found.component';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    CompanyListComponent,
    NotFoundComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CollapseModule,
    DataTablesModule,
    Ng4LoadingSpinnerModule,
    RouterModule.forRoot([
      { 
        path: '', 
        component: LoginComponent 
      },
      { 
        path: 'login', 
        component: LoginComponent 
      },
      { 
        path: 'company', 
        component: CompanyListComponent, 
        canActivate: [EnsureAuthenticated] 
      },
      { 
        path: 'editcompany/:companyId', 
        component: EditCompanyComponent,
        canActivate: [EnsureAuthenticated] 
      },
      { 
        path: 'addcompany', 
        component: AddCompanyComponent,
        canActivate: [EnsureAuthenticated] 
      },
      { 
        path: '**', 
        component: NotFoundComponent 
      },
    ])
  ],
  providers: [LoginService, 
              CompanyService, 
              CookieService, 
              NavbarService,
              EnsureAuthenticated ,
              // Ng4LoadingSpinnerService,
              FileUploadService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
