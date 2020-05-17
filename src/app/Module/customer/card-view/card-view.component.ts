import { filter } from 'rxjs/operators';
import { AuthService } from './../../../Shared/Services/auth.service';
import { Customers } from './../../../Shared/models/customers';
import { CustomerService } from './../../../Shared/Services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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
  user: any = {
    name: '',
    gender: '',
    address: '',
    city: '',
    lat: '',
    lng: '',
    image: ''
  };

  constructor(private customerService: CustomerService, private auth: AuthService, private router:Router) {}

  ngOnInit(): void {
    this.getCustomerList();
  }

  findSearch(val) {
    this.searchText = val.toLowerCase();
    this.result = this.allCustomer.filter(all => {
      return all.name.toLowerCase().includes(this.searchText);
    })
  }

  @ViewChild('myForm') form: any;
  cityList: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
  allCustomer: Customers[];
  errorMsg: string;

  userFilter(value) {
    console.log(value)
  }  

  public getCustomer(user):void  {
    this.router.navigate(['/customers/edit-customer']);
    this.customerService.selectedId.next(user);   
  }

  public getDetails(user):void  {
    this.router.navigate(['/customers/customer-details']);
    this.customerService.selectedId.next(user);   
  }

  public getOrders(user):void  {
    //this.router.navigate(['/customers/edit-customer']);
    this.customerService.selectedId.next(user);   
  }

  public getCustomerList(): void {
    this.customerService.getCardViewCustomer().subscribe((res) => {
      this.allCustomer = res
      this.totalRecords = res.length;
    },
      (error) => { this.errorMsg = error });
  }

  public postLogin(formObject):void {
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

  public viewCustomerDetails(id: number): void {
       this.customerService.getCardViewCustomer().subscribe(data => { console.log(data) });
  }

  public deleteCustomer(customer: Customers): void {
    this.customerService.deleteCustomer(+customer.id).subscribe(
      data => {
        this.allCustomer = this.allCustomer.filter(u =>
          u !== customer)
      }
    );
  }

}
