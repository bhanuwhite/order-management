import { Customers } from './../../../Shared/models/customers';
import { CustomerService } from './../../../Shared/Services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {
  allCustomer: Customers[];
  errorMsg: string;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomerList();
  }

  public getCustomerList(): void {
    this.customerService.getCardViewCustomer().subscribe((res) => { this.allCustomer = res },
      (error) => { this.errorMsg = error });
  }

  public deleteCustomer(customer : Customers):void{
    console.log("I am in delete" + customer);
       this.customerService.deleteCustomer(+customer.id).subscribe(
         data => {this.allCustomer = this.allCustomer. filter(u =>
          u !== customer),alert("Are you sure you want to delete this cutomer ?")}
       );
  }

}
