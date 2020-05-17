import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstValue } from '../helpers/constValue';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Injectable()
export class AccountService {

  constructor(private http: HttpClient) {

  }
  update_account(FirstName: string, LastName: string, Token: string) {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net",
        {
          "Method": "UpdateUserProfile", 
          "FirstName": FirstName, "LastName": LastName,
          "Token": Token
        },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
            .set("X-Api-Key", "95rZwFqA3RzSu26JNg4bCU92sD2nWv4e")
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        let user_data = JSON.parse(localStorage.getItem(ConstValue.User));
        user_data.FirstName = res.Data.User.FirstName;
        user_data.LastName = res.Data.User.LastName;
        localStorage.setItem(ConstValue.User, JSON.stringify(user_data));
        if(res.Success) {
          Swal.fire(
            'Success!',
            'Your info were updated Successfully.',
            'success'
          )
        }else {
          Swal.fire(
            'Failed!',
            '',
            'error'
          )
        }
        
      },
        msg => { 
          Swal.fire(
            'Failed!',
            '',
            'error'
          )
          //reject(msg);
         });
    });
    return promise;
  }
  update_password(CurrentPassword: string, NewPassword: string, Token: string) {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net",
        {
          "Method": "UpdatePassword",
          "CurrentPassword": CurrentPassword, "NewPassword": NewPassword,
          "Token": Token
        },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
            .set("X-Api-Key", "95rZwFqA3RzSu26JNg4bCU92sD2nWv4e")
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        if(res.Success) {
          Swal.fire(
            'Success!',
            'Your password were updated Successfully.',
            'success'
          )
        }else {
          Swal.fire(
            'Failed!',
            '',
            'error'
          )
        }
      },
        msg => { 
          Swal.fire(
            'Failed!',
            '',
            'error'
          )
          //reject(msg); 
        });
    });
    return promise;
  }
}
