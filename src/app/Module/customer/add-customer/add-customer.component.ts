import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  isValidFormSubmitted: boolean = true
  // @ViewChild('myForm') form: any;
  possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
  lengthOfCode = 60;
  //allUser: Customers[];
  user: any = {
    email: '',
    password: ''
  };

  cityList: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
  constructor() { }

  ngOnInit(): void {

  }

  // postLogin(formObject) {
  // this.auth.getAllUser().subscribe(res => {
  //   this.allUser = res
  //   this.allUser.filter(res => {
  //     if (res.email == this.user.email && res.password == this.user.password) {
  //       console.log("login")
  //       this.makeRandom(this.lengthOfCode, this.possible);
  //       this.form.reset();
  //       this.router.navigate(['customers/card-view'])
  //     } else { }
  //   })
  // })
  // }

  postLogin(formObject) {
    console.log(formObject);
    formObject.lat = "40.713829";
    formObject.lng = "40.713829";
    if (formObject.gender == "male") {
      console.log("I am in male");
      formObject.image = "assets/images/unnamed.png";
    }
    if (formObject.gender == "female") {
      console.log("I am in female");
      formObject.image = "assets/images/teacher-295387_960_720.png";
    }
    console.log(formObject);
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    console.log(text)
    localStorage.setItem('randToken', JSON.stringify(text));
  }


}
