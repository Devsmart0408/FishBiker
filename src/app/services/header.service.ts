import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { shareReplay, map, publishReplay, refCount } from 'rxjs/operators';
import { ConstValue } from '../helpers/constValue';
import { Tenant } from '../model/tenant';
import { User } from '../model/user';
import { ShoppingCart } from '../model/shoppingCart';

@Injectable({
  providedIn: 'root'
})

export class HeaderService {

  private ShoppingCartSource = new BehaviorSubject<ShoppingCart>(this.getLocalStorageItemBykey(ConstValue.ShoppingCart));
  shoppingCart = this.ShoppingCartSource.value;
  private curUserSource = new BehaviorSubject<User>(this.getLocalStorageItemBykey(ConstValue.User));
  curUser = this.curUserSource.value;
  private tenantSource = new BehaviorSubject<Tenant>(this.getLocalStorageItemBykey(ConstValue.Tenant));
  currentTenant = this.tenantSource.asObservable();

  constructor(private http: HttpClient) {
    this.setHeaderShoppingCart()
  }

  setHeaderShoppingCart() {
    let carttotalPrice = 0;
    let totalCounts = 0;
    this.shoppingCart = JSON.parse(localStorage.getItem(ConstValue.ShoppingCart))
    if(this.shoppingCart != null && Object.keys(this.shoppingCart).length !== 0) {
      this.shoppingCart.Products.forEach(function(item, index, array) {
        carttotalPrice = carttotalPrice + item.Count * item.PricePerUnit;          
        totalCounts = totalCounts + item.Count;
      })
      this.shoppingCart.Count = totalCounts;
      this.shoppingCart.Total = carttotalPrice;
    }
  }

  getTenantIdFromServer(domainName: string):Observable<Tenant> {
      return  this.http.post<any>("https://api.novacept.net",
        { "Method": "GetTenantId", "DomainName": domainName, "WithPublicKey" : true },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
       })
        .pipe(map(data => {
          this.tenantSource.next(data);
          return data.Data;
        }));  
  }
  
  getLocalStorageItemBykey(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  getTenantDetails(tenantId: string) {
    this.http.post<any>("https://api.novacept.net",
      { "Method": "TenantDetails", "TenantId": tenantId },
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    ).subscribe((detail) => {
      localStorage.setItem(ConstValue.TenantDetail, JSON.stringify(detail.Data))
    });
  }

  getLanguages(tenantId: string) {
    this.http.post<any>("https://api.novacept.net",
      { "Method": "Languages", "TenantId": tenantId },
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    ).subscribe((lang) => {
      localStorage.setItem(ConstValue.Languages, JSON.stringify(lang.Data));
    });
  }

  getCurrencies(tenantId: string):void {
    this.http.post<any>("https://api.novacept.net/",
      { "Method": "Currencies", "TenantId": tenantId },
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe((result) => {
        localStorage.setItem(ConstValue.Currency, JSON.stringify(result.Data));
      });
  }

  getGraphics(tenantId: string, publicKey: string) {
    this.http.post<any>("https://api.novacept.net",
      { "Method": "TenantGraphics", "TenantId": tenantId, ApiKey: publicKey },
      {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }
    ).subscribe((graphics) => {
      localStorage.setItem(ConstValue.Graphics, JSON.stringify(graphics.Data));
    });
  }
}
