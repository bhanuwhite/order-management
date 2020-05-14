import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardViewComponent } from './card-view/card-view.component';
import { Routes, RouterModule } from '@angular/router';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { ListViewComponent } from './list-view/list-view.component';
import { MapViewComponent } from './map-view/map-view.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'card-view', component: CardViewComponent },
      { path: 'list-view', component: ListViewComponent },
      { path: 'map-view', component: MapViewComponent },
      { path: 'add-customer', component: AddCustomerComponent },

    ], component: CustomerHeaderComponent
  }

];

@NgModule({
  declarations: [CardViewComponent, CustomerHeaderComponent, ListViewComponent, MapViewComponent, AddCustomerComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class CustomerModule { }
