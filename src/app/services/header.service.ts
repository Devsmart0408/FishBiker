import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { shareReplay, map, publishReplay, refCount } from 'rxjs/operators';
import { ConstValue } from '../helpers/constValue';
import { Tenant } from '../model/tenant';

@Injectable({
  providedIn: 'root'
})

export class HeaderService {

  private tenantSource = new BehaviorSubject<Tenant>(this.getLocalStorageItemBykey(ConstValue.Tenant));
  currentTenant = this.tenantSource.asObservable();

  constructor(private http: HttpClient) {}

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
