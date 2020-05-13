import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { HeaderService } from '../services/header.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthenticationService, private headerService: HeaderService,
    private router: Router, private http: HttpClient) {
    if (this.authService.currentUserVal) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.username, this.password).then((result: any) => {
      this.router.navigateByUrl("/order");
    })
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']);
    })
  }
}
