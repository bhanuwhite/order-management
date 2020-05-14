import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from "../utility/constant";
import { Observable } from 'rxjs';
import {Customers } from '../models/customers';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  
  getCardViewCustomer():Observable<Customers[]>{
    return this.http.get<Customers[]>(Constant.url + "users");
  }

}
