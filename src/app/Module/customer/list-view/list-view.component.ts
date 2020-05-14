import { Component, OnInit } from '@angular/core';
import { Customers } from 'src/app/Shared/models/customers';
import { CustomerService } from 'src/app/Shared/Services/customer.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  listCustomer:Customers[];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomerList();
  }    
   public getCustomerList():void {
    this.customerService.getCardViewCustomer().subscribe(res => {
      console.log("list values " + this.listCustomer );
      this.listCustomer = res;
    });
  }

}
