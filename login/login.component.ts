import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myform: FormGroup;
  public user_email: string;
  public user_pass: string;
  public val: any;
  constructor(private router: Router, private httpClient: HttpClient, private _cookieService: CookieService) { }

  public cookie;

  ngOnInit() {
    this.myform = new FormGroup({
      useremail : new FormControl('', [
         Validators.required,
         Validators.pattern('[^ @]*@[^ @]*')
       ]),
       password : new FormControl('', [
         Validators.required,
         Validators.minLength(8)
       ])
    });
    this.cookie = this._cookieService.get('uemailid');
    if (this.cookie !== 'false') {
      this.router.navigateByUrl('/userpage');
    }
  }

  public userpage() {
    this._cookieService.put('uemailid', this.user_email);
    const URL = `http://localhost:8001/getpassword/` + this.user_email + `,` + this.user_pass ;
    if ((this.user_email !== undefined) &&  (this.user_pass !== undefined)) {
    this.httpClient.get(URL, { responseType: 'text'}).subscribe(
      (data: string) => {
        this.val = data;
        if ( data === 'True' ) {
          // console.log(' y') ;
          window.localStorage.setItem('useremailid', this.user_email);
          this.router.navigateByUrl('/userpage');
        } else {
          alert('Please enter correct password !!');
          this.router.navigateByUrl('/login');
        }
      }
      ,
      error => console.log('oops', error)
    );
  } else {
    alert('All fields are required !!');
  }
   // console.log(this.val);
  }



  onPasswordKeyUp(event: any) {
    this.user_pass = event.target.value;
  }

  onUseremailKeyUp(event: any) {
    this.user_email = event.target.value;
  }


}
