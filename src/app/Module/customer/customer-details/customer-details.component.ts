import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/Shared/Services/customer.service';
import { Customers } from 'src/app/Shared/models/customers';


@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  currentUserId:any;
  lat: number = 33.4484;
  lng: number = 112.0740;
  setLat:number;
  setLng : number;
  user: any = {
    name: '',
    gender: '',
    address: '',
    city: '',
    lat: '',
    lng: '',
    image: ''
  };
  userCustomer: Customers [];

  @ViewChild('myForm') form: any;

  constructor(private customerService: CustomerService,) { }

  ngOnInit(): void {
    this.getCustomerDetails();
  }

  public getCustomerDetails():void{
    this.customerService.getSelectedId.subscribe(resp => {      
      this.currentUserId = resp['id'],
        this.user = resp;   
        this.userCustomer = resp;
    });
    this.setLat=this.user.lat;
    this.setLng=this.user.lng;      
  }

  


}
