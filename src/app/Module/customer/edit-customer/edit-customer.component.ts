import { Customers } from '../../../Shared/models/customers';
import { CustomerService } from '../../../Shared/Services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  isValidFormSubmitted: boolean = true
  currentUserId: any;
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

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    this.getCustomerList();
    this.editUser()
  }

  public getCustomerList(): void {
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


  editUser() {
    // console.log(user)
    this.customerService.getSelectedId.subscribe(resp => {
      console.log(resp)
      this.currentUserId = resp['id']
      this.user = resp
    })
    // this.isEdit = true
    //  this.user = user
  }

  updateUser(myObj) {
    console.log(myObj)
    // this.isEdit = !this.isEdit;


    this.customerService.updateCardViewCustomer(this.currentUserId, myObj).subscribe(res => {
      console.log(res)
      // this.getCustomerList()
      this.router.navigate(['customers/card-view'])
      // this.router.navigate(['login']);
    })
  }



}
