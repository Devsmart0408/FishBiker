import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HeaderService } from '../services/header.service';
import { ConstValue } from '../helpers/constValue';
import { ChildComponent } from '../modal/child.component';
import { Tenant } from '../model/tenant';

@Component({
  templateUrl: './api.component.html',
})
export class ApiComponent implements OnInit {

  private tenant: Tenant;
  apiKey: string;
  constructor(private http: HttpClient, private headerService: HeaderService) {

    console.log("loading constr, localstorage is " + JSON.parse(localStorage.getItem(ConstValue.Tenant)));
    //console.log("header service " + this.headerService.tenant.PublicKey);
    //if (JSON.parse(localStorage.getItem(ConstValue.Tenant))) {
    //  this.apiKey = JSON.parse(localStorage.getItem(ConstValue.Tenant)).PublicKey;
    //}
  }

  @ViewChild(ChildComponent, { static: false }) childModal: ChildComponent;

  openModal() {
    console.log(this.childModal)
    const id = Math.floor(Math.random() * 50);
    this.childModal.open(id);
  }


  ngOnInit(): void {

    this.headerService.currentTenant.subscribe((tenant) => {
      this.tenant = tenant;
      console.log(this.tenant);
    });

    //this.apiKey = JSON.parse(localStorage.getItem(ConstValue.Tenant)).PublicKey;
    //console.log("constructr apikey is " + this.apiKey)
  }

  sia(username: string, password: string) {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net",
        { "Method": "Authenticate", "Username": username, "Password": password },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
            .set("X-Api-Key", "95rZwFqA3RzSu26JNg4bCU92sD2nWv4e")
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        localStorage.setItem(ConstValue.User, JSON.stringify(res.Data));
      },
        msg => { reject(msg); });
    });
    return promise;
  }


  ping() {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net/ecommerce",
        { "Method": "Ping"},
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
            .set("X-Api-Key", "95rZwFqA3RzSu26JNg4bCU92sD2nWv4e")
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        localStorage.setItem(ConstValue.User, JSON.stringify(res.Data));
      },
        msg => { reject(msg); });
    });
    return promise;
  }

  GetTenantId() {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net/",
        { "Method": "GetTenantId", "DomainName": "fishbiker.com", "WithPublicKey" : true },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        console.log(res);
      },
        msg => { reject(msg); });
    });
    return promise;
  }

  testEcom() {
    //console.log(this.apiKey);
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net/Ecommerce",
        {
          "Method": "AllProductCategories", "ApiKey": this.apiKey},
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        console.log(res);
      },
        msg => { reject(msg); });
    });
    return promise;
  }

  testgraphics() {
    //console.log(this.apiKey);
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net",
        //{
        //  "Method": "TenantGraphics","TenantId":this.headerService.tenant.TenantId, "ApiKey": this.apiKey
        //},
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        console.log(res);
      },
        msg => { reject(msg); });
    });
    return promise;
  }

  testBluePrint() {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net/",
        { "Method": "BluePrint" },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        console.log(res);
      },
        msg => { reject(msg); });
    });
    return promise;
  }

  pingKernal() {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net/Kernel",
        //{ "Method": "ping"},
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        console.log(res);
      },
        msg => { reject(msg); });
    });
    return promise;
  }

  getErrorCode() {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net",
        { "Method": "ErrorCodes"},
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        console.log(res);
      },
        msg => { reject(msg); });
    });
    return promise;
  }

  signOut() {
    //console.log(this.apiKey);
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net",
        { "Logout": "ErrorCodes", ApiKey: "BBelQb7OGuOSqE0v7pxddfAh5W1wCndVEZyzcvJ3udotuy3sMNAWZuzgZ9oyPB2i" },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        console.log(res);
      },
        msg => { reject(msg); });
    });
    return promise;
  }

}



