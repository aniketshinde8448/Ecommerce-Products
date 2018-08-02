import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myform: FormGroup;
  public user_name: string;
  public user_pass: string;
  public user_email: string;
  public user_type: string;



  constructor(private router: Router, private httpClient: HttpClient, private _cookieService: CookieService) { }

  public cookie;
  ngOnInit() {
    this.myform = new FormGroup({
      username : new FormControl(this.user_name, [
        Validators.required,
        Validators.maxLength(30)
      ]),
       password : new FormControl(this.user_pass, [
         Validators.required,
         Validators.minLength(8)
       ]),
       useremail : new FormControl(this.user_email, [
         Validators.required,
         Validators.pattern('[^ @]*@[^ @]*')
       ])
    });
    this.cookie = this._cookieService.get('uemailid');
    if (this.cookie !== 'false') {
      this.router.navigateByUrl('/userpage');
    }
  }

  public submit() {
    const reqObject = {
      user_name: this.user_name,
      user_pass: this.user_pass,
      user_email: this.user_email,
      user_type: 'vendor'
  };
  console.log(reqObject);
  if ((reqObject.user_name !== undefined) &&  (reqObject.user_pass !== undefined) && (reqObject.user_email !== undefined)) {
  this.httpClient.post(`http://localhost:8001/addusers`, reqObject, { responseType: 'text'}).subscribe((data: any) => {
      console.log(data);
      alert('Sign up successfully !!!');
      this.router.navigateByUrl('/login');
  }
);
  } else {
    alert('All fields are required !!');
  }
  }


  onUsernameKeyUp(event: any) {
    this.user_name = event.target.value;
  }

  onPasswordKeyUp(event: any) {
    this.user_pass = event.target.value;
  }

  onUseremailKeyUp(event: any) {
    this.user_email = event.target.value;
  }

  }


