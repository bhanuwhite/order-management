import { NotificationService } from './../../../Shared/Services/notification.service';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../Shared/Services/customer.service';
import { Router } from '@angular/router';
import { Constant } from '../../../Shared/utility/constant';
import { MapsService } from 'src/app/Shared/Services/maps.service';

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
  completeAddress: string;
  mapslng: number;
  mapslat: number;
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
    private notifyService: NotificationService,
    private mapsService: MapsService
  ) { }

  ngOnInit(): void { }

  public addCustomer(formObject): void {
    this.completeAddress = formObject.address + formObject.city;
    this.mapsService.getMapInfo(this.completeAddress).subscribe(data => {
      debugger;
      this.mapslat = data.candidates[0].geometry.location.lat;
      this.mapslng = data.candidates[0].geometry.location.lng;
    });
    console.log("this.mapslat = " + this.mapslat + "  this.mapslng = " + this.mapslng);
    formObject.image = this.uploadImage;
    formObject.lat = "33.4484";
    formObject.lng = "112.0740";
    this.customerService.createCustomer(formObject).subscribe(data => {
      this.notifyService.showSuccess("Customer Added Successfully !!", "Notification");
      this.router.navigate(['customers/card-view'])
    });
  }
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
