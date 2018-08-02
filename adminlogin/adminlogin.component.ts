import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  public user_email: string;
  public user_pass: string;
  public val: any;

  constructor(private router: Router, private httpClient: HttpClient, private _cookieService: CookieService) { }

  public cookie;
  ngOnInit() {
    this.cookie = this._cookieService.get('uemailid');
    if (this.cookie !== 'false') {
      this.router.navigateByUrl('/adminpage');
    }
  }

  public adminpage() {
    this._cookieService.put('uemailid', this.user_email);
     const URL = `http://localhost:8001/getpassword/` + this.user_email + `,` + this.user_pass ;
    this.httpClient.get(URL, { responseType: 'text'}).subscribe(
      (data: string) => {
        this.val = data;
        if ( data === 'True' ) {
          // console.log(' y') ;
          window.localStorage.setItem('useremailid', this.user_email);
          this.router.navigateByUrl('/adminpage');
        } else {
          alert('Please enter valid password !!');
          this.router.navigateByUrl('/adminlogin');
        }
      }
      ,
      error => console.log('oops', error)
    );
    // console.log(this.val);
  }
  onPasswordKeyUp(event: any) {
    this.user_pass = event.target.value;
  }

  onUseremailKeyUp(event: any) {
    this.user_email = event.target.value;
  }


}
