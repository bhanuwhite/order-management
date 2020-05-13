import { CustomerService } from './../../../Shared/Services/customer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {
  allCustomer: any;
  constructor(private service: CustomerService) { }

  ngOnInit(): void {
    this.getCustomerList()
  }

  getCustomerList() {
    this.service.getCardViewCustomer().subscribe(res => {
      console.log(res)
      this.allCustomer = res
    })
  }

}
