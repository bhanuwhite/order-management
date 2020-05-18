import { Customers } from './../../../Shared/models/customers';
import { Router } from "@angular/router";
import { filter } from 'rxjs/operators';
import { AuthService } from './../../../Shared/Services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isValidFormSubmitted: boolean = true
  @ViewChild('myForm') form: any;
  possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
  lengthOfCode = 60;
  allUser: Customers[];
  user: any = {
    email: '',
    password: ''
  };
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  public postLogin(formObject):void {
    this.auth.getAllUser().subscribe(res => {
      this.allUser = res
      this.allUser.filter(res => {
        if (res.email == this.user.email && res.password == this.user.password) {
          this.makeRandom(this.lengthOfCode, this.possible);
          this.form.reset();
          this.router.navigate(['customers/card-view']);
        } else { }
      })
    })
  }

  public makeRandom(lengthOfCode: number, possible: string):void {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      localStorage.setItem('randToken', JSON.stringify(text));
  }
}
