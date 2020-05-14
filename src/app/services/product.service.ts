import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstValue } from '../helpers/constValue';
import { Product } from '../model/product';
import { ProductCategory } from '../model/productcategory';
import { environment } from '../../environments/environment';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getAllCategories() {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(environment.apiEndPointEcommerce,
        { "Method": "AllProductCategories" },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
            .set("X-Api-Key", "95rZwFqA3RzSu26JNg4bCU92sD2nWv4e")
        }
      ).toPromise().then((res: any) => {
        console.log('service');
        console.log(res);
        resolve(res);
        localStorage.setItem(ConstValue.ProductCategory, JSON.stringify(res.Data));
      },
        msg => { reject(msg); });
    });
    return promise;
  }


  getAllProductPerCategory(categoryId: number) {
    let promise = new Promise((resolve, reject) => {
      this.http.post<any>(environment.apiEndPointEcommerce,
        { "Method": "AllProductsOfCategory", "CategoryId": categoryId, "CurrencyId": environment.currencyId },
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
            .set("X-Api-Key", "95rZwFqA3RzSu26JNg4bCU92sD2nWv4e")
        }
      ).toPromise().then((res: any) => {
        resolve(res);
        console.log(res.Data);
        localStorage.setItem(ConstValue.Product, JSON.stringify(res.Data));
      },
        msg => { reject(msg); });
    });
    return promise;
  }



  getProductFromLocalStorage(): Product[] {
    try {
      return JSON.parse(localStorage.getItem(ConstValue.Product));
    } catch (error) {
      return null!;
    }
  }
}
