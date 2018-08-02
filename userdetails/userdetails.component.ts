import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {

  public row;
  public element;
  public c;
  public brk;
  public ob;
  public pd;
  public pnm;
  public uemailid;
  public URL;
  public obj;
  constructor(private router: Router, private httpClient: HttpClient, private _cookieService: CookieService) { }

  public cookie;
  public backtoprod() {
    this.router.navigateByUrl('/adminpage');
  }

  public signout() {
    this._cookieService.put('uemailid', 'false');
    this.router.navigateByUrl('/adminlogin');
  }

  public disp(d) {
    this.obj = document.createElement('table');
    this.row = this.obj.insertRow(0);
    this.c = this.row.insertCell(0);
    this.c.innerHTML = 'User Name '.bold();
    this.c = this.row.insertCell(1);
    this.c.innerHTML = ' User Email id '.bold();

    this.element = document.getElementById('users');
    this.element.appendChild(this.obj);

    for (let i = 0 ; i < d.length; i++) {
    this.row = this.obj.insertRow(1);
    this.c = this.row.insertCell(0);
    this.c.innerHTML = d[i].user_name;
    this.c = this.row.insertCell(1);
    this.c.innerHTML = d[i].user_email;
    this.pd = JSON.stringify(d[i]);
    this.element = document.getElementById('users');
    this.element.appendChild(this.obj);
    }
  }

  ngOnInit() {
    this.cookie = this._cookieService.get('uemailid');
    if (this.cookie === 'false') {
      this.router.navigateByUrl('/adminlogin');
    }
    this.uemailid = localStorage.getItem('useremailid');
    this.ob = document.createElement('p');
    const msg = document.createTextNode('Hi ' + this.uemailid );
    this.ob.appendChild(msg);
    const elem = document.getElementById('user name');
    elem.appendChild(this.ob);

    this.URL = 'http://localhost:8001/getusers';
    this.httpClient.get(this.URL, { responseType: 'json'}).subscribe(
      (data: any) => {
        console.log(data[0]);
        this.disp(data);
        // this.prod_data = data;
      }
    );
  }

}
