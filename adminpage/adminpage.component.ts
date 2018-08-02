import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';
import { Directive, Renderer, ElementRef } from '@angular/core';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  private nativeElement: Node;
  public ob;
  public msg;
  public URL;
  public row;
  public element;
  public c;
  public brk;
  public pd;
  public pnm;
  public product_name;

  constructor(private router: Router, private httpClient: HttpClient,  private _cookieService: CookieService,
  private renderer: Renderer, private elementr: ElementRef) { }

  public cookie;
  public logout() {
    this._cookieService.put('uemailid', 'false');
    this.router.navigateByUrl('/adminlogin');
  }

  public getusers() {
    this.router.navigateByUrl('/userdetails');
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
      this.router.navigateByUrl('/adminlogin');
  }
);
        // delprod(pnm);
        // alert(this.pnm);
      } else {
               this.router.navigateByUrl('/adminpage');
      }
    // alert(pname);
  }

  public updatepage(udd, n) {


    this.router.navigate(['/adminupdatepage', JSON.stringify(udd[n])]);
  }

  public disp(d) {
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
    c.innerHTML = 'User Email id '.bold();
    c.appendChild(this.brk);

    this.element = document.getElementById('products');
    this.element.appendChild(obj);
    // this.element.appendChild(this.brk);
    // this.brk.appendChild()

    for (let i = 0; i < d.length; i ++) {
    this.row = obj.insertRow(1);
    c = this.row.insertCell(0);
    c.innerHTML = d[i].product_name;
    c = this.row.insertCell(1);
    c.innerHTML = d[i].product_desc;
    c = this.row.insertCell(2);
    c.innerHTML = d[i].product_category;
    c = this.row.insertCell(3);
    c.innerHTML = d[i].product_price;
    c = this.row.insertCell(4);
    c.innerHTML = d[i].user_email;
    this.pd = JSON.stringify(d[i]);
    const ubuttonElement = this.renderer.createElement(this.nativeElement, 'button');
    this.renderer.createText(ubuttonElement, 'UPDATE');
    this.renderer.setElementProperty(ubuttonElement, 'disabled', false);
    this.renderer.listen(ubuttonElement, 'click', ( event ) => this.updatepage(d, i));
    // const ubutton = document.createElement('a');
    // ubutton.innerHTML = 'UPDATE';
    // ubutton.onclick = this.onupdate(JSON.stringify(dt[i]));
    // localStorage.setItem('updateProd', JSON.stringify(dt[i]));
    // ubutton.href = 'http://localhost:4200/updateproduct' + JSON.stringify(d[i]);
    // ubutton.onclick = this.setprod(JSON.stringify(dt[i]));
    c = this.row.insertCell(5);
    c.appendChild(ubuttonElement);
    this.pnm = d[i].product_name;
    const dbuttonElement = this.renderer.createElement(this.nativeElement, 'button');
    this.renderer.createText(dbuttonElement, 'DELETE');
    this.renderer.setElementProperty(dbuttonElement, 'disabled', false);
    this.renderer.listen(dbuttonElement, 'click', ( event ) => this.delprod(d, i));
    // const dbutton = document.createElement('button');
    // dbutton.innerHTML = 'DELETE';
    // dbutton.onclick = this.delprod(this.pnm); // function() {
      // if (confirm('Are You Sure You Want To Delete?')) {
        // delprod(pnm);
        // alert(this.pnm);
      // } else {
         //       window.location.href = 'http://localhost:4200/userpage';
      // }
    // };
    c = this.row.insertCell(6);
    c.appendChild(dbuttonElement);
    this.element = document.getElementById('products');
    this.element.appendChild(obj);
  }
  }

  ngOnInit() {
    this.cookie = this._cookieService.get('uemailid');
    if (this.cookie === 'false') {
      this.router.navigateByUrl('/adminlogin');
    }
    const useremailid = localStorage.getItem('useremailid');
               // alert(useremailid);
    this.ob = document.createElement('p');
    this.msg = document.createTextNode('Hi ' + useremailid);
    this.ob.appendChild(this.msg);

    const elem = document.getElementById('user name');
    elem.appendChild(this.ob);

    this.URL = 'http://localhost:8001/getproducts';
    this.httpClient.get(this.URL, { responseType: 'json'}).subscribe(
      (data: any) => {
        console.log(data[0]);
        this.disp(data);
        // this.prod_data = data;
      }
    );
  }

}
