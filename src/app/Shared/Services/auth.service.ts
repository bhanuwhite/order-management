import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Constant } from "../utility/constant";
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createLogin(user): Observable<any> {
    return this.http.post(Constant.url + "loginUser", user)
  }
  getAllUser(): Observable<any> {
    return this.http.get(Constant.url + "loginUser")
  }
  // getUser(user): Observable<any> {
  //   return this.http.get(Constant.url + "loginUser/" + user)
  // }
}
