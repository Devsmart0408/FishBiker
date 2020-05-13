import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderService } from '../services/header.service';
import { User } from '../model/user';

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

  fname: string;
  lname: string;
  email: string;
  phoneNumber: string;
  password: string;
  verificationKey: string;
  verifyInput: string;
  otp: string;
  verificationKeyValidated: boolean = false;
  userRegisterd: boolean = false;
  user: User;

  constructor(private authService: AuthenticationService, private headerService: HeaderService,
    private router: Router, private http: HttpClient) {
    //if (this.authService.currentUserVal) {
    //  this.router.navigate(['/']);
    //}
  }
  ngOnInit(): void {
    this.user = this.authService.currentUserVal;
  }

  verifyContact(verifyVal: string) {
    this.authService.verifyContact(verifyVal).then((data: any) => {
      this.verificationKey = data.Data.VerificationKey;
    })
  }

  verifyOTP(OTP: string) {
    this.authService.verfiyOTP(OTP).then((data : any) => {
      if (data.Success) {
        this.verificationKeyValidated = true;
      }
    })
  }

  register() {
    this.authService.register(this.email, this.password, this.phoneNumber, this.fname, this.lname).then((data) => {
      this.userRegisterd = true;
    })
  }

}
