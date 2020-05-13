import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header.service';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';
import { Tenant } from '../model/tenant';
import { ProductCategory } from '../model/productCategory';
import { ShoppingCart } from '../model/shoppingCart';
import { ConstValue } from '../helpers/constValue';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit
{
  products: Product[];
  tenant: Tenant;
  productCategories: ProductCategory[]
  shoppingCart: ShoppingCart;
  selectCategoryId : any;  

  
  constructor(private router: Router, private headerService: HeaderService, private productService: ProductService) {
    this.shoppingCart = new ShoppingCart();
    this.shoppingCart.Products = [];

  }

  

  ngOnInit() {
    this.getProductCategories();
    this.getAllProducts();
  }


  getProductCategories() {
    this.productCategories = JSON.parse(localStorage.getItem(ConstValue.ProductCategory));
    this.selectCategoryId = this.productCategories[0].SubCategories[0].CategoryId
  }
  setCategory(id: any) {
    this.selectCategoryId = id;
  }
  filterProducts(your_collection): any[] {  
    return your_collection.filter(i => i.CategoryId === this.selectCategoryId);
  }
  getAllProducts() {
    this.products = JSON.parse(localStorage.getItem(ConstValue.Product));
  }

  AddToCart(product: Product) {
    this.shoppingCart.Products.push(product);
  }

  goToShoppingCart(shoppingCart: ShoppingCart) {
    this.router.navigateByUrl
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product'], {
      queryParams:
        { id: productId }
    });
  }

  openQuickModal(product: Product) {
    console.log(product)
  }

}
