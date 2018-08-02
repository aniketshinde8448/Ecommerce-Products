import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-adminupdatepage',
  templateUrl: './adminupdatepage.component.html',
  styleUrls: ['./adminupdatepage.component.css']
})
export class AdminupdatepageComponent implements OnInit {

  public uuid;
  public product_name: string;
  public product_desc: string;
  public product_category: string;
  public product_price: number;
  public is_Active: number;
  public user_email;
  public prodd;
  public obj;
  public row;
  public c;
  public brk;
  public element;
  public pd;
  public arv;
  public fuuid;
  public fproduct_name;
  public fproduct_desc;
  public fproduct_category;
  public fproduct_price;
  public fis_Active;
  public fuser_email;
  public ffuuid;
  public ffproduct_name;
  public ffproduct_desc;
  public ffproduct_category;
  public ffproduct_price;
  public ffis_Active;
  public ffuser_email;
  constructor(private router: Router, private httpClient: HttpClient) { }

  public updtproduct() {
    const reqObject = {
      uuid: this.ffuuid[1],
      product_name: this.product_name,
      product_desc: this.product_desc,
      product_category: this.product_category,
      product_price: this.product_price,
      is_Active: 1,
      user_email: localStorage.getItem('useremailid')
    };
    this.httpClient.put(`http://localhost:8001/updateprod`, reqObject, { responseType: 'text'}).subscribe((data: any) => {
      // console.log(data);
      alert('Product updated successfully !!!');
      this.router.navigateByUrl('/adminpage');
  }
);
  }

  public disp(ud, nm, de, cat, pr, ia, ue) {
    this.brk = document.createElement('br');
    this.obj = document.createElement('table');
    this.row = this.obj.insertRow(0);
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
    this.element.appendChild(this.obj);

    this.row = this.obj.insertRow(1);
    c = this.row.insertCell(0);
    c.innerHTML = nm;
    c = this.row.insertCell(1);
    c.innerHTML = de;
    c = this.row.insertCell(2);
    c.innerHTML = cat;
    c = this.row.insertCell(3);
    c.innerHTML = pr;
    this.element.appendChild(this.obj);
    // document.getElementById('prodname').defaultValue = nm;
    // document.getElementById('proddesc').defaultValue = de;
    // document.getElementById('prodcat').defaultValue = cat;
    // document.getElementById('prodprice').defaultValue = pr;
  }


  ngOnInit() {
    const ur = window.location.href;
    // alert(ur);
    const b = ur.split('/');
    // alert(b);
    const c = b[4].split(',');
   // alert(c);
    for (let j = 0; j < c.length; j++) {
      // alert(c[j]);
    }
    this.fuuid = c[0].split(':');
    this.fproduct_name = c[1].split(':');
    this.fproduct_desc = c[2].split(':');
    this.fproduct_category = c[3].split(':');
    this.fproduct_price = c[4].split(':');
    this.fis_Active = c[5].split(':');
    this.fuser_email = c[6].split(':');

    this.ffuuid = this.fuuid[1].split('%22');
    this.ffproduct_name = this.fproduct_name[1].split('%22');
    this.ffproduct_desc = this.fproduct_desc[1].split('%22');
    this.ffproduct_category = this.fproduct_category[1].split('%22');
    this.ffproduct_price = this.fproduct_price[1].split('%22');
    this.ffis_Active = this.fis_Active[1].split('%22');
    this.ffuser_email = this.fuser_email[1].split('%22');

    console.log(this.ffuuid);
    console.log( this.ffproduct_name);
    // alert( this.fproduct_desc);
    // alert( this.fproduct_category);
    // alert(this.fproduct_price);
    // alert(this.fis_Active);
    // alert(this.fuser_email);

    // this.prodd = decodeURIComponent(window.location.search); // localStorage.getItem('updateProd');
    // const arv = this.prodd.substring(0);
    // this.pd = JSON.parse(this.prodd);
    // alert(this.prodd);
    // console.log('retrievedObject: ', JSON.parse(arv));
    this.disp(this.ffuuid[1].replace('%20', ' '), this.ffproduct_name[1].replace('%20', ' '), this.ffproduct_desc[1].replace('%20', ' '),
     this.ffproduct_category[1].replace('%20', ' '), this.ffproduct_price[1], this.ffis_Active[1], this.ffuser_email[1]);
  }

  onProdnameKeyUp(event: any) {
    this.product_name = event.target.value;
  }

  onProddescKeyUp(event: any) {
    this.product_desc = event.target.value;
  }

  onProdcatKeyUp(event: any) {
    this.product_category = event.target.value;
  }

  onProdpriceKeyUp(event: any) {
    this.product_price = event.target.value;
  }

}
