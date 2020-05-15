import { AuthService } from './../../../Shared/Services/auth.service';
import { Customers } from './../../../Shared/models/customers';
import { CustomerService } from './../../../Shared/Services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {
  isValidFormSubmitted: boolean = true
  isEdit: boolean = false;
  user: any = {
    name: '',
    gender: '',
    address: '',
    city: '',
    lat: '',
    lng: '',
    image: ''

  };
  @ViewChild('myForm') form: any;
  cityList: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
  allCustomer: Customers[];
  errorMsg: string;
  isUserLogin: boolean;
  checkLogin: string;

  constructor(private customerService: CustomerService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getCustomerList();
    this.checkLogin = localStorage.getItem('randToken')
    console.log(this.checkLogin)
    if (this.checkLogin) {
      this.isUserLogin = true
      console.log(this.isUserLogin)
    }
    else {
      this.isUserLogin = false
      console.log(this.isUserLogin)
    }
  }

  public getCustomerList(): void {
    this.auth.checkLogin.next({ isLoggedIn: this.isUserLogin });
    this.isUserLogin = true
    this.customerService.getCardViewCustomer().subscribe((res) => { this.allCustomer = res },
      (error) => { this.errorMsg = error });
  }

  postLogin(formObject) {
    console.log(formObject);
    formObject.lat = "40.713829";
    formObject.lng = "40.713829";
    if (formObject.gender == "male") {
      console.log("I am in male");
      formObject.image = "assets/images/unnamed.png";
    }
    if (formObject.gender == "female") {
      console.log("I am in female");
      formObject.image = "assets/images/teacher-295387_960_720.png";
    }
    console.log(formObject);
  }


  editUser(user) {
    this.isEdit = true
    this.user = user
  }

  updateUser() {
    this.isEdit = !this.isEdit;
    this.customerService.updateCardViewCustomer(this.user).subscribe(res => {
      console.log(res)
      this.getCustomerList()
      this.form.reset();
    })
  }
  public deleteCustomer(customer: Customers): void {
    console.log("I am in delete" + customer);
    this.customerService.deleteCustomer(+customer.id).subscribe(
      data => {
        this.allCustomer = this.allCustomer.filter(u =>
          u !== customer), alert("Are you sure you want to delete this cutomer ?")
      }
    );
  }

}
