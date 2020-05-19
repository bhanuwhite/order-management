import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Maps } from '../models/location';
import { Observable } from 'rxjs';
import { Constant } from "../utility/constant";

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  myURl="../assets/json/testGeometry.json"
  //checkURL:string;
  constructor(private  http:HttpClient ) { }
 
  public getMapInfo(address):Observable<Maps>{
   // return this.http.get<Maps>(this.myURl);

        return this.http.get<Maps>(Constant.mapAPI+address+ Constant.mapPara + Constant.googleKey);
  }

}
