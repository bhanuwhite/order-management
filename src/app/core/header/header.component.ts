import { AuthService } from './../../Shared/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  checkLogin: string;

  isUserLogin: boolean = false;
  constructor(private router: Router, private location: Location, private auth: AuthService) {
    this.checkLogin = localStorage.getItem('randToken')
    if (this.checkLogin) {
      this.isUserLogin = true
    }
    else {
      this.isUserLogin = false
    }

  }

  ngOnInit(): void { }

  logout() {
    localStorage.removeItem('randToken');
    this.router.navigate(['login']);
  }

}
