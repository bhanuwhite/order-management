import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../Shared/Services/customer.service';
import { Router } from '@angular/router';
import { Constant } from '../../../Shared/utility/constant';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  isValidFormSubmitted: boolean = true;
  urls: File[];

  // @ViewChild('myForm') form: any;


  user: any = {
    name: '',
    gender: '',
    address: '',
    city: '',
    lat: '',
    lng: '',
    image: ''

  };

  cityList: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {

  }

  public postLogin(formObject): void {
    console.log(formObject);
    console.log(formObject.image, typeof (formObject.image))
    if (formObject.image) {
      formObject.image = formObject.image.replace("C:\\fakepath\\", 'assets/images/');
    }
    formObject.lat = "40.713829";
    formObject.lng = "-73.989667";
    if (formObject.gender == "male") {
      formObject.image = "assets/images/unnamed.png";
    }
    if (formObject.gender == "female") {

      formObject.image = "assets/images/teacher-295387_960_720.png";
    }
    this.customerService.createCustomer(formObject).subscribe(data => {
      this.router.navigate(['customers/card-view'])
    });
  }



  // on Change FileUpload Function & validating the file type and file size
  public onSelectFile(event): any {
    console.log(event)
    this.urls = [];
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        if (event.target.files[i]) {
          let fileType = event.target.files[i].type;
          if (fileType == Constant.imageJPEG || fileType == Constant.imagePNG || fileType == Constant.imageJPG) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[i]);
            reader.onload = (event: any) => {
              //  console.log(event)
              if (event.loaded < 3000000) {
                this.urls.push(event.target.result);
                console.log(this.urls)
              }
              else {
                this.failFileSize();
              }
            }
          }
          else {
            //  this.failFileType();
          }
        }
      }
    }
  }

  failFileSize() {
    // this.notifyService.failFileSize("File Size Exceeded !!", "Notification");
  }



}
