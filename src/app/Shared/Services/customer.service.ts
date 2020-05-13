import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from "../utility/constant";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  getCardViewCustomer(): Observable<any> {
    return this.http.get(Constant.url + "users")
  }

}
