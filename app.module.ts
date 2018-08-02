import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { UserpageComponent } from './userpage/userpage.component';
import { InterceptorModule } from './interceptor.module';
import { TableComponent } from './table/table.component';
import { TableRowComponent } from './table-row/table-row.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { DeleteproductComponent } from './deleteproduct/deleteproduct.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AdminupdatepageComponent } from './adminupdatepage/adminupdatepage.component';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'adminlogin',
    component: AdminloginComponent
  },
  {
    path: 'userpage',
    component: UserpageComponent
  },
  {
    path: 'addproduct',
    component: AddproductComponent
  },
  {
    path: 'updateproduct/:udd',
    component: UpdateproductComponent
  },
  {
    path: 'adminupdatepage/:udd',
    component: AdminupdatepageComponent
  },
  {
    path: '**',
    redirectTo: 'udapteproduct',
    pathMatch: 'full'
  },
  {
    path: 'adminpage',
    component: AdminpageComponent
  },
  {
    path: 'userdetails',
    component: UserdetailsComponent
  }

];


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    AdminloginComponent,
    UserpageComponent,
    TableComponent,
    TableRowComponent,
    AddproductComponent,
    UpdateproductComponent,
    DeleteproductComponent,
    AdminpageComponent,
    UserdetailsComponent,
    AdminupdatepageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    InterceptorModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
