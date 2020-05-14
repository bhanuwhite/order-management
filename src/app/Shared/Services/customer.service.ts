import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from "../utility/constant";
import { Observable, throwError } from 'rxjs';
import {Customers } from '../models/customers';
import { catchError } from 'rxjs/operators';
//import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  
  getCardViewCustomer():Observable<Customers[]>{
    return this.http.get<Customers[]>(Constant.url + "users")
    .pipe(catchError(this.errorHandler));
  }
  // errorHandler(error: HttpErrorResponse){
  //   console.log("I am in serve error");    
  //    return throwError(error.message)
  // }
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
