import { Component, OnInit, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './services/header.service';
import { Currency } from './model/currency';
import { Language } from './model/language';
import { Graphics } from './model/graphics';
import { TenantDetails } from './model/TenantDetails';
import { ProductCategory } from './model/productCategory';
import { ConstValue } from './helpers/constValue';
import { Product } from './model/product';
import { Tenant } from './model/tenant';
import { AuthenticationService } from './services/authentication.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  currencies: Currency[];
  languages: Language[];
  graphics: Graphics;
  productCategories: ProductCategory[]
  products: Product[];
  tenantDetails: TenantDetails;
  tenant: Tenant;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private headerService: HeaderService,
    private productService: ProductService)
  {

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
    //else {
    //  this.getProductCategories();
    //  this.getAllProducts();
    //}
  }

  ngOnInit() : void {
    import('../assets/js/main.js');
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
      }
    })
  }
}
