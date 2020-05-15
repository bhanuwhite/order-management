import { Customers } from './../models/customers';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from "../utility/constant";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCardViewCustomer(): Observable<Customers[]> {
    return this.http.get<Customers[]>(Constant.url + "users")
      .pipe(catchError(this.errorHandler));
  }

  updateCardViewCustomer(user): Observable<Customers[]> {
    return this.http.put<Customers[]>(Constant.url + "users" + user.id, user)
  }

  createUser(user): Observable<Customers[]> {
    return this.http.post<Customers[]>(Constant.url + "users", user)
  }

  createCustomer(customersInfo : Customers){
    return this.http.post(Constant.url + "users",customersInfo);
  }
  // errorHandler(error: HttpErrorResponse){
  //   console.log("I am in serve error");    
  //    return throwError(error.message)
  // }

  deleteCustomer(id : number){
    return this.http.delete<Customers[]>(Constant.url+"users"+'/'+ id);
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


}
