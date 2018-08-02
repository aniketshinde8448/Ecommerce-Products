import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { Directive, Renderer, ElementRef } from '@angular/core';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  private nativeElement: Node;
  public uemailid: string;
  public URL: string;
  public prod_data: JSON;
  public row;
  public element;
  public c;
  public brk;
  public ob;
  public pd;
  public pnm;
  public cookie;
  public ubutton;
  public dbutton;
  public product_name;
  constructor(private router: Router, private httpClient: HttpClient, private _cookieService: CookieService,
    private renderer: Renderer, private elementr: ElementRef) { }

  public logout() {
    // alert(this._cookieService.get('uemailid'));
    this._cookieService.put('uemailid', 'false');
    // alert(this._cookieService.get('uemailid'));
    this.router.navigateByUrl('/login');
  }

  public addpage() {
    this.router.navigateByUrl('/addproduct');
  }

  public updatepage(udd, n) {


    this.router.navigate(['/updateproduct', JSON.stringify(udd[n])]);
  }

  public delprod(pd, n) {
    this.product_name = pd[n].product_name;
    if (confirm('Are You Sure You Want To Delete?')) {

      const reqObject = {
      product_name: this.product_name
      };
      const URL = `http://localhost:8001/deleteprod/` + this.product_name;
    this.httpClient.delete(URL, { responseType: 'text'} ).subscribe((data: any) => {
      // console.log(data);
      alert('Product deleted successfully !!!');
      this.router.navigateByUrl('/login');
  }
);
        // delprod(pnm);
        // alert(this.pnm);
      } else {
               this.router.navigateByUrl('/userpage');
      }
    // alert(pname);
  }

  setprod(p) {
    alert('in setprod');
    localStorage.setItem('updateProd', p);
    // this.router.navigateByUrl('/updateproduct');
  }
  public disp(dt) {
    // alert(JSON.stringify(dt));
    this.brk = document.createElement('br');
    const obj = document.createElement('table');
    this.row = obj.insertRow(0);
    let c = this.row.insertCell(0);
    c.innerHTML = 'Product Name'.bold();
    c = this.row.insertCell(1);
    c.innerHTML = ' Product Description '.bold();
    c = this.row.insertCell(2);
    c.innerHTML = ' Product Category '.bold();
    c = this.row.insertCell(3);
    c.innerHTML = ' Product Price '.bold();
    c = this.row.insertCell(4);
    c.appendChild(this.brk);

    this.element = document.getElementById('products');
    this.element.appendChild(obj);
    // this.element.appendChild(this.brk);
    // this.brk.appendChild()

    for (let i = 0; i < dt.length; i ++) {
    this.row = obj.insertRow(1);
    c = this.row.insertCell(0);
    c.innerHTML = dt[i].product_name;
    c = this.row.insertCell(1);
    c.innerHTML = dt[i].product_desc;
    c = this.row.insertCell(2);
    c.innerHTML = dt[i].product_category;
    c = this.row.insertCell(3);
    c.innerHTML = dt[i].product_price;
    this.pd = JSON.stringify(dt[i]);
    const ubuttonElement = this.renderer.createElement(this.nativeElement, 'button');
    this.renderer.createText(ubuttonElement, 'UPDATE');
    this.renderer.setElementProperty(ubuttonElement, 'disabled', false);
    this.renderer.listen(ubuttonElement, 'click', ( event ) => this.updatepage(dt, i));
    // this.ubutton = document.createElement('button');
    // this.ubutton.innerHTML = 'UPDATE';
    // alert(typeof dt[i]);
    // ubutton.onclick = this.onupdate(JSON.stringify(dt[i]));
    // localStorage.setItem('updateProd', JSON.stringify(dt[i]));
    // this.ubutton.onclick = this.updatepage(dt[i]); // 'http://localhost:4200/updateproduct' + JSON.stringify(dt[i]);
    // ubutton.onclick = this.setprod(JSON.stringify(dt[i]));
    c = this.row.insertCell(4);
    c.appendChild(ubuttonElement);
    this.pnm = dt[i].product_name;
    const dbuttonElement = this.renderer.createElement(this.nativeElement, 'button');
    this.renderer.createText(dbuttonElement, 'DELETE');
    this.renderer.setElementProperty(dbuttonElement, 'disabled', false);
    this.renderer.listen(dbuttonElement, 'click', ( event ) => this.delprod(dt, i));
    // this.dbutton = document.createElement('button');
    // this.dbutton.innerHTML = 'DELETE';
    // this.dbutton.onclick = this.delprod(this.pnm); // function() {
      // if (confirm('Are You Sure You Want To Delete?')) {
        // delprod(pnm);
        // alert(this.pnm);
      // } else {
         //       window.location.href = 'http://localhost:4200/userpage';
      // }
    // };
    c = this.row.insertCell(5);
    c.appendChild(dbuttonElement);
    this.element = document.getElementById('products');
    this.element.appendChild(obj);
  }
}

  ngOnInit() {
    this.cookie = this._cookieService.get('uemailid');
    if (this.cookie === 'false') {
      this.router.navigateByUrl('/login');
    }
    this.uemailid = localStorage.getItem('useremailid');
    this.ob = document.createElement('p');
    const msg = document.createTextNode('Hi ' + this.uemailid );
    this.ob.appendChild(msg);
    const elem = document.getElementById('user name');
    elem.appendChild(this.ob);

    // alert('dcb');
    this.URL = 'http://localhost:8001/getproduct/' + this.uemailid;
    this.httpClient.get(this.URL, { responseType: 'json'}).subscribe(
      (data: any) => {
        console.log(data[0]);
        this.disp(data);
        // this.prod_data = data;
      }
    );
    // console.log(this.prod_data);
  }

}

