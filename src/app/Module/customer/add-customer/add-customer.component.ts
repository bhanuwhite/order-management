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
    address: '',
    city: '',
    lat: '',
    lng: '',
  };

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void { }
  // function for add customer
  onSubmit(formObject) {
    try {
      formObject.value.lat = "33.4484";
      formObject.value.lng = "112.0740";
      formObject.value.image = this.uploadImage;
      if (formObject.value?.invalid) {
        console.log("invalid")
        this.isValidFormSubmitted = false;
      }
      else {
        console.log("valid")
        this.isValidFormSubmitted = true;
        this.customerService.createCustomer(formObject.value).subscribe(data => {
          this.notifyService.showSuccess("Customer Added Successfully !!", "Notification");
          this.router.navigate(['customers/card-view'])
        });
      }
    }
    catch (err) {
      console.log(err)
    }
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
