import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { shareReplay, map, publishReplay, refCount } from 'rxjs/operators';
import { ConstValue } from '../helpers/constValue';
import { Tenant } from '../model/tenant';
import { ShoppingCart } from '../model/shoppingCart';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  private _shoppingCartSubject: BehaviorSubject<ShoppingCart>;
  public shoppingCart: Observable<ShoppingCart>;

  constructor(private http: HttpClient) {

    this._shoppingCartSubject = new BehaviorSubject<ShoppingCart>(this.getShoppingCartFromLocalStorage());
    this.shoppingCart = this._shoppingCartSubject.asObservable();
  }


  private getShoppingCartFromLocalStorage(): ShoppingCart {
    try {
      return JSON.parse(localStorage.getItem(ConstValue.ShoppingCart)!);
    } catch (error) {
      return null!;
    }
  }
}
