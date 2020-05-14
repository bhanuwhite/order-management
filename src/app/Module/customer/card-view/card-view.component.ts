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

}
