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
  constructor(private service: CustomerService) { }

  ngOnInit(): void {
    this.getCustomerList()
  }

  getCustomerList() {
    this.service.getCardViewCustomer().subscribe(res => {
      this.allCustomer = res
    })
  }

}
