import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HeaderService } from '../services/header.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../model/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { ConstValue } from '../helpers/constValue';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthenticationService, private headerService: HeaderService,
    private router: Router, private http: HttpClient) {
    if (this.headerService.curUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.username, this.password).then((result: any) => {
      this.headerService.curUser = new BehaviorSubject<User>(this.headerService.getLocalStorageItemBykey(ConstValue.User)).value;
      this.router.navigateByUrl("/order");
    })
  }

  logout() {
    this.authService.logout().then(() => {
      this.headerService.curUser = null;
      this.router.navigate(['/']);
    })
  }
}
