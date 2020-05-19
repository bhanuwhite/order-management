import { Component, OnInit } from '@angular/core';
import { Customers } from '../../../Shared/models/customers';
import { CustomerService } from '../../../Shared/Services/customer.service';
import { NotificationService } from 'src/app/Shared/Services/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  listCustomer: Customers[];
  errorMsg: string;
  totalRecords: number;

  constructor(private customerService: CustomerService,
    private notifyService: NotificationService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCustomerList();
  }
  // funtion to get all customers
  public getCustomerList(): void {
    this.customerService.getCardViewCustomer().subscribe(res => {
      this.spinner.hide();
      this.listCustomer = res;
      this.totalRecords = res.length;
    },
      (error) => { this.errorMsg = error });
  }
  // funtion for delete 
  public deleteCustomer(customer: Customers): void {
    this.customerService.deleteCustomer(+customer.id).subscribe(
      data => {
      this.listCustomer = this.listCustomer.filter(u =>
        u !== customer),
        this.notifyService.showFail("Customer Deleted Successfully !!", "Notification");
      }
    );
  }
  // function to go to edit
  public getCustomer(user): void {
    this.router.navigate(['/customers/edit-customer']);
    this.customerService.selectedId.next(user);
  }
}
