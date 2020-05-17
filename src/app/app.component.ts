import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HeaderService } from './services/header.service';
import { Currency } from './model/currency';
import { Language } from './model/language';
import { Graphics } from './model/graphics';
import { TenantDetails } from './model/TenantDetails';
import { ProductCategory } from './model/productCategory';
import { ConstValue } from './helpers/constValue';
import { Product } from './model/product';
import { User } from './model/user';
import { Tenant } from './model/tenant';
import { AuthenticationService } from './services/authentication.service';
import { ProductService } from './services/product.service';

import { ShoppingCart, CartProduct} from './model/shoppingCart';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy  {
  
  shoppingCart: ShoppingCart;
  cartTotalPrice: number;
  cartTotalCount: number;

  currencies: Currency[];
  languages: Language[];
  graphics: Graphics;
  productCategories: ProductCategory[]
  products: Product[];
  tenantDetails: TenantDetails;
  tenant: Tenant;
  curUser: User;
  routerSubscription: any;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    public headerService: HeaderService,
    private productService: ProductService)
  {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    if (!this.headerService.getLocalStorageItemBykey(ConstValue.Product)) {

      this.productService.getAllCategories();
      //  .then((categoryData: any) => {
      //  this.productCategories = categoryData.Data[0].SubCategories;
      //});

      //category 1 will return all products
      this.productService.getAllProductPerCategory(1);
      //  .then((productsData: Product[]) => {
      //  this.products = productsData;
      //});

      //hard-code languages and currencies
    }
    
  }

  ngOnInit() : void {
    // import('../assets/js/main.js');
    // $.getScript('../assets/js/main.js');
    this.recallJsFuntions();
    
    this.getAllShoppingcarts();
    if(this.headerService.getLocalStorageItemBykey(ConstValue.User)) {
      this.curUser = JSON.parse(localStorage.getItem(ConstValue.User));
    }
  }
  recallJsFuntions() {
    this.routerSubscription = this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd){
        $.getScript('../assets/js/main.js');
      }
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
  getAllShoppingcarts() {
    let carttotalPrice = 0;
    let totalCounts = 0;
    let get_shoppingCart;
    get_shoppingCart = JSON.parse(localStorage.getItem(ConstValue.ShoppingCart));

    if(get_shoppingCart){
      this.shoppingCart = get_shoppingCart;
    }

    if(this.shoppingCart != null && Object.keys(this.shoppingCart).length !== 0) {
      this.shoppingCart.Products.forEach(function(item, index, array) {
        carttotalPrice = carttotalPrice + item.Count * item.PricePerUnit;          
        totalCounts = totalCounts + item.Count;
      })
    } 
    this.cartTotalPrice = carttotalPrice;
    this.cartTotalCount = totalCounts;
  }

  getCurrencies() {
    this.currencies = JSON.parse(localStorage.getItem(ConstValue.Currency));
  }

  getLanguages() {
    this.languages = JSON.parse(localStorage.getItem(ConstValue.Languages));
  }



  viewPage(pageName: string) {
    this.router.navigate(["'/" + pageName + "'"]);
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product'], {
      queryParams:
        { id: productId }
    });
  }


  goToCheckOut() {
    this.router.navigate(["/shoppingcart"]);
  }

  signOut() {
    this.authService.logout().then((result: any) => {
      if (result.Success) {
        this.router.navigateByUrl("/")
        this.headerService.curUser = null;
      }
    })
  }
}
