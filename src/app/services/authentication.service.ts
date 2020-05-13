import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstValue } from '../helpers/constValue';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { Verification } from '../model/verification';

@Injectable()
export class AuthenticationService {


  private _currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {

    this._currentUserSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
    this.currentUser = this._currentUserSubject.asObservable();
  }


  public get currentUserVal(): User {
    return this._currentUserSubject.value;
  }


  login(emailAddress: string, password: string) {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net",
        { "Method": "Login", "EmailAddress": emailAddress, "Password": password },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
            .set("X-Api-Key", "95rZwFqA3RzSu26JNg4bCU92sD2nWv4e")
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        localStorage.setItem(ConstValue.User, JSON.stringify(res.Data.User));
      },
        msg => { reject(msg); });
    });
    return promise;
  }


  logout() {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://dev.novacept.net",
        {
          "Method": "Logout", "Token": this.currentUserVal.Token
        },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
            .set("X-Api-Key", "95rZwFqA3RzSu26JNg4bCU92sD2nWv4e")
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        localStorage.removeItem(ConstValue.User);
      },
        msg => { reject(msg); });
    });
    return promise;
  }

  verfiyOTP(OTP: string) {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net",
        { "Method": "VerifyOTP", "VerificationKey": this.getKeyFromLocalStorage().VerificationKey, "OTP": OTP },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
            .set("X-Api-Key", "95rZwFqA3RzSu26JNg4bCU92sD2nWv4e")
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        localStorage.setItem(ConstValue.verificationKey, JSON.stringify(res.Data));
      },
        msg => { reject(msg); });
    });
    return promise;
  }

  verifyContact(verifyVariable: string) {
    var verifyMethod: string;
    if (verifyVariable.includes("@")) {
      verifyMethod = "Email";
    }
    else {
      verifyMethod = "SMS";
    }
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net",
        { "Method": "VerifyContact", "VerificationMethod": verifyMethod, "Recipient": verifyVariable },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
            .set("X-Api-Key", "95rZwFqA3RzSu26JNg4bCU92sD2nWv4e")
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        localStorage.setItem(ConstValue.verificationKey, JSON.stringify(res.Data));
      },
        msg => { reject(msg); });
    });
    return promise;
  }

  register(emailAddress: string, password: string, phoneNumber: string, fName: string, lname: string) {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>("https://api.novacept.net",
        {
          "Method": "RegisterUser", "VerificationKey": this.getKeyFromLocalStorage().ValidatedVerificationKey,
          "Password": password, "EmailAddress": emailAddress,
          "PhoneNumber": phoneNumber, "FirstName": fName,"LastName" : lname
        },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
            .set("X-Api-Key", "95rZwFqA3RzSu26JNg4bCU92sD2nWv4e")
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        localStorage.setItem(ConstValue.User, JSON.stringify(res.Data.User));
      },
        msg => { reject(msg); });
    });
    return promise;
  }


  private getUserFromLocalStorage(): User {
    try {
      return JSON.parse(localStorage.getItem(ConstValue.User)!);
    } catch (error) {
      return null!;
    }
  }

  private getKeyFromLocalStorage(): Verification {
    try {
      return JSON.parse(localStorage.getItem(ConstValue.verificationKey)!);
    } catch (error) {
      return null!;
    }
  }
}
