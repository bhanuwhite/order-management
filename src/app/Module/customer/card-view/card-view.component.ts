import { filter } from 'rxjs/operators';
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
  page: number = 1;
  isValidFormSubmitted: boolean = true
  totalRecords: any;

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

  findSearch(val) {
    console.log(val)
  }



  @ViewChild('myForm') form: any;
  cityList: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
  allCustomer: Customers[];
  errorMsg: string;

  userFilter(value) {
    console.log(value)
  }


  constructor(private customerService: CustomerService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getCustomerList();
    // this.config = {
    //   itemsPerPage: 5,
    //   currentPage: 1,
    //   totalItems: this.allCustomer.length
    // };
  }

  getCustomer(user) {
    console.log(user)
    this.customerService.selectedId.next(user);
  }


  public getCustomerList(): void {
    this.customerService.getCardViewCustomer().subscribe((res) => {
      this.allCustomer = res
      this.totalRecords = res.length;
    },
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

  viewCustomerDetails(id: number) {
    console.log("see id " + id);
    let viewdata;
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
