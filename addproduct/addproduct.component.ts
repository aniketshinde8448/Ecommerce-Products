import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  myform: FormGroup;
  public product_name: string;
  public product_desc: string;
  public product_category: string;
  public product_price: number;
  public is_Active: number;
  public user_email;
  constructor(private router: Router, private httpClient: HttpClient) { }

  ngOnInit() {
    this.myform = new FormGroup({
      prodname : new FormControl('', [
        Validators.required,
        Validators.maxLength(30)
      ]),
       proddesc : new FormControl('', [
         Validators.required,
         Validators.maxLength(30)
       ]),
       prodcat : new FormControl('', [
         Validators.required,
         Validators.maxLength(30)
       ]),
       prodprice : new FormControl('', [
         Validators.required,
         Validators.pattern('[^0-9]*'),
         Validators.maxLength(6)
       ])
    });
  }

  public addnewproduct() {
    const reqObject = {
      product_name: this.product_name,
      product_desc: this.product_desc,
      product_category: this.product_category,
      product_price: this.product_price,
      is_Active: 1,
      user_email: localStorage.getItem('useremailid')
  };
  // console.log(reqObject);
  // alert(reqObject.product_name);
  // tslint:disable-next-line:max-line-length
  if ((reqObject.product_name !== undefined) &&  (reqObject.product_desc !== undefined) && (reqObject.product_category !== undefined) && (reqObject.product_price !== undefined)) {
  this.httpClient.post(`http://localhost:8001/addproducts`, reqObject, { responseType: 'text'}).subscribe((data: any) => {
      // console.log(data);
      alert('Product added successfully !!!');
      this.router.navigateByUrl('/userpage');
  }
);
  } else {
    alert('All fields are required ');
  }
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
