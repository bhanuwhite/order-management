import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardViewComponent } from './card-view/card-view.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '', children: [
      { path: 'card-view', component: CardViewComponent }

    ]
  }

];

@NgModule({
  declarations: [CardViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CustomerModule { }
