import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';

import { ConstValue } from '../helpers/constValue';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HeaderService } from '../services/header.service';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shoppingcart.service';

import { Tenant } from '../model/tenant';
import { ProductCategory } from '../model/productCategory';
import { Product } from '../model/product';
import { ShoppingCart, CartProduct} from '../model/shoppingCart';


import { CartModalComponent } from '../modal/cartmodal.component';
import { SuccessCartModalComponent } from '../modal/successcartmodal.component';
import { QuickModalComponent } from '../modal/quickmodal.component';

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
  cartTotalPrice: number;
  cartTotalCount: number;
  cartProduct: CartProduct;
  selectCategoryId : any;  

  constructor(private router: Router, 
              private headerService: HeaderService, 
              private productService: ProductService,
              private shoppingCartService: ShoppingCartService,
              private modalService: NgbModal) {
    this.shoppingCart = new ShoppingCart();
    this.cartProduct = new CartProduct();
    //this.shoppingCart.Products = [];
  }

  

  ngOnInit() {
    this.getProductCategories();
    this.getAllProducts();
    this.getAllShoppingcarts();
  }
  getProductCategories() {
    this.productCategories = JSON.parse(localStorage.getItem(ConstValue.ProductCategory));
    this.selectCategoryId = this.productCategories[0].SubCategories[0].CategoryId
  }
  setCategory(id: any) {
    this.selectCategoryId = id;
  }
  filterProducts(your_collection): any[] {  
    if(your_collection){
      return your_collection.filter(i => i.CategoryId === this.selectCategoryId);
    }
    
  }
  getAllProducts() {
    this.products = JSON.parse(localStorage.getItem(ConstValue.Product));
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
        totalCounts = totalCounts + 1;
      })
    } 
    this.cartTotalPrice = carttotalPrice;
    this.cartTotalCount = totalCounts;
  }
  showCartModal(product: Product) {
    const modalCharge = this.modalService.open(CartModalComponent);
    modalCharge.componentInstance.product = product;
    modalCharge.result.then(product => {
      this.getAllShoppingcarts();
    }, (reason) => {})
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

  viewQuick(product: Product) {
    const modalCharge = this.modalService.open(QuickModalComponent);
    modalCharge.componentInstance.product = product;
    modalCharge.result.then(product => {
      this.getAllShoppingcarts();
    }, (reason) => {})
  }

  addCartCount(product: any) {
    this.shoppingCart.Products.forEach(function(item, index, array) {
      if(item.Product.ProductId == product.Product.ProductId && item.AttributeId == product.AttributeId) {
        item.Count = item.Count + 1;
        return;
      }
    })
    localStorage.setItem(ConstValue.ShoppingCart, JSON.stringify(this.shoppingCart));
    this.getAllShoppingcarts();
  }
  removeCartCount(product: any) {
    this.shoppingCart.Products.forEach(function(item, index, array) {
      if(item.Product.ProductId == product.Product.ProductId && item.AttributeId == product.AttributeId) {
        if(item.Count > 0) {
          item.Count = item.Count - 1;
          return;
        }
      }
    })
    localStorage.setItem(ConstValue.ShoppingCart, JSON.stringify(this.shoppingCart));
    this.getAllShoppingcarts();
  }
  deleteCart(product: any) {
    this.shoppingCart.Products.forEach(function(item, index, array) {
      if(item.Product.ProductId == product.Product.ProductId && item.AttributeId == product.AttributeId) {
        array.splice(0, 1);
        return;
      }
    })
    localStorage.setItem(ConstValue.ShoppingCart, JSON.stringify(this.shoppingCart));
    this.getAllShoppingcarts();
  }
}
