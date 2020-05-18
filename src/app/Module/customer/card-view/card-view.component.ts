import { NotificationService } from './../../../Shared/Services/notification.service';
import { AuthService } from './../../../Shared/Services/auth.service';
import { Customers } from './../../../Shared/models/customers';
import { CustomerService } from './../../../Shared/Services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from '../../../Shared/utility/constant';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {
  page: number = 1;
  isValidFormSubmitted: boolean = true
  totalRecords: any;
  selected: string;
  searchText: any;
  isEdit: boolean = false;
  search1: any;
  result: any;
  @ViewChild('myForm') form: any;
  cityList: string[] = Constant.city;
  allCustomer: Customers[];
  errorMsg: string;

  user: any = {
    name: '',
    gender: '',
    address: '',
    city: '',
    lat: '',
    lng: '',
    image: ''
  };

  constructor(private customerService: CustomerService, private auth: AuthService, private router:Router, 
    private spinner: NgxSpinnerService  , private notifyService:NotificationService ) {}

  ngOnInit(): void {
    this.getCustomerList();
  }

  public getCustomer(user):void  {
    this.router.navigate(['/customers/edit-customer']);
    this.customerService.selectedId.next(user);   
  }
// fuction for customer details 
  public getDetails(user):void  {
    this.router.navigate(['/customers/customer-details']);
    this.customerService.selectedId.next(user);   
  }
//fuction for Orders
  public getOrders(user):void  {
      this.customerService.selectedId.next(user);   
  }   

  // function for customer list
  public getCustomerList() {
    this.spinner.show();
    this.customerService.getCardViewCustomer().subscribe((res) => {
      this.spinner.hide();
      this.allCustomer = res
      this.totalRecords = res.length;
    },
      (error) => { this.errorMsg = error });
  }
 
  // function for customer details
  viewCustomerDetails(id: number) {
    this.spinner.show();
    let viewdata;
    this.customerService.getCardViewCustomer().subscribe(data => {
      this.spinner.hide();      
    });
  }

  // function for delete customer
  public deleteCustomer(customer: Customers): void {
    this.spinner.show();
    this.customerService.deleteCustomer(+customer.id).subscribe(
      data => {
        this.spinner.hide();
        this.notifyService.showFail("Customer Deleted Successfully !!", "Notification");
        this.allCustomer = this.allCustomer.filter(u =>
          u !== customer)
      }
    );
  }

  // function for filter 
  findSearch(val) {
    this.searchText = val.toLowerCase();
    this.result = this.allCustomer.filter(all => {
      return all.name.toLowerCase().includes(this.searchText);
    })
  }

}
