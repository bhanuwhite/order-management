import { NotificationService } from './../../../Shared/Services/notification.service';
import { Customers } from 'src/app/Shared/models/customers';
import { CustomerService } from 'src/app/Shared/Services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from '../../../Shared/utility/constant';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  isValidFormSubmitted: boolean = true
  currentUserId: any;
  urls: File[];
  uploadImage: File[];
  isEdit: boolean = false;
  user: any = {
    name: '',
    gender: '',
    address: '',
    city: '',
    lat: '',
    lng: '',
    image: ''

  };
  @ViewChild('myForm') form: any;
  cityList: string[] = Constant.city
  allCustomer: Customers[];
  errorMsg: string;
  isUserLogin: boolean;
  checkLogin: string;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.editUser()
  }

  // function for edit customer
  editUser() {
    this.customerService.getSelectedId.subscribe(resp => {
      this.currentUserId = resp['id']
      this.user = resp
    })
  }
  // function for update customer
  updateUser(myObj) {
    myObj.image = this.uploadImage;
    this.customerService.updateCardViewCustomer(this.currentUserId, myObj).subscribe(res => {
      this.notifyService.showSuccess("Customer Updated Successfully !!", "Notification");
      this.router.navigate(['customers/card-view'])
    })
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
                
              }
            }
          }
          else {
           
          }
        }
      }
    }
  }
  failFileSize() {
   
  }


}
