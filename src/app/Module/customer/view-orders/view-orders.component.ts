import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/Shared/models/orders';
import { Customers } from 'src/app/Shared/models/customers';
import { CustomerService } from 'src/app/Shared/Services/customer.service';
import { OrdersService } from 'src/app/Shared/Services/orders.service';


@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  currentUserId: any;
  orders: Orders[] = [];
  myID: number = 2;
  products: any = [];
  productNames: any = [];
  productPrice: any = [];
  constructor(private ordersService: OrdersService, private customersService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomerOrders();
  }

  public getCustomerDetails(): void {
    this.customersService.getSelectedId.subscribe(resp => {
      this.currentUserId = resp['id'];
      if (this.currentUserId >= 1) {
        this.getCustomerOrders();
      }
    });
  }

  public getCustomerOrders(): void {
    this.ordersService.getCustomerOrders().subscribe(resp => {
        this.orders = resp.filter(r => { return r["userId"] == 2 })
        console.log("I am in orders" + this.orders);
      console.log("I am in orders" + this.products);  
     });
  }

}
