import { NotificationService } from './../../../Shared/Services/notification.service';
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
  uploadImage: File[];
  cityList: string[] = Constant.city;
  user: any = {
    name: '',
    gender: '',
    address: '',
    city: '',
    lat: '',
    lng: '',
    image: ''
  };
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void { }

  public addCustomer(formObject): void {
    console.log(formObject);
    console.log(formObject.image, typeof (formObject.image))
    formObject.image = this.uploadImage;
    formObject.lat = "33.4484";
    formObject.lng = "112.0740";
      this.customerService.createCustomer(formObject).subscribe(data => {
      this.notifyService.showSuccess("Customer Added Successfully !!", "Notification");
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
              console.log(event)
              if (event.loaded < 3000000) {
                this.uploadImage = event.target.result
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
