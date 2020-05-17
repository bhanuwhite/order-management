import { NotificationService } from './../../../Shared/Services/notification.service';
import { Customers } from 'src/app/Shared/models/customers';
import { CustomerService } from 'src/app/Shared/Services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from '../../../Shared/utility/constant';

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
  cityList: string[] = Constant.city
  allCustomer: Customers[];
  errorMsg: string;
  isUserLogin: boolean;
  checkLogin: string;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.editUser()
  }

  // function for edit customer
  editUser() {
    this.customerService.getSelectedId.subscribe(resp => {
      this.currentUserId = resp['id']
      this.user = resp
    })
  }
  // function for update customer
  updateUser(myObj) {
    this.customerService.updateCardViewCustomer(this.currentUserId, myObj).subscribe(res => {
      this.notifyService.showSuccess("Customer Updated Successfully !!", "Notification");
      this.router.navigate(['customers/card-view'])
    })
  }



}
