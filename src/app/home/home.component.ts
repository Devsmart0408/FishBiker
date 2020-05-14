import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header.service';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shoppingcart.service';
import { Product } from '../model/product';
import { Tenant } from '../model/tenant';
import { ProductCategory } from '../model/productCategory';
import { ShoppingCart, CartProduct} from '../model/shoppingCart';
import { ConstValue } from '../helpers/constValue';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartModalComponent } from '../modal/cartmodal.component';

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
    return your_collection.filter(i => i.CategoryId === this.selectCategoryId);
  }
  getAllProducts() {
    this.products = JSON.parse(localStorage.getItem(ConstValue.Product));
  }
  getAllShoppingcarts() {
    this.shoppingCart = JSON.parse(localStorage.getItem(ConstValue.ShoppingCart));
  }
  showCartModal(product: Product) {
    const modalCharge = this.modalService.open(CartModalComponent);
    modalCharge.componentInstance.product = product;
    // this.shoppingCart = JSON.parse(localStorage.getItem(ConstValue.ShoppingCart));
    // if(Object.keys(this.shoppingCart).length === 0) {
    //   console.log(this.shoppingCart);
    //   this.shoppingCart.Id = '';
    //   this.shoppingCart.Products = Array();
    //   this.shoppingCart.Total = 0;
    //   this.shoppingCart.Note = '';
    //   this.shoppingCart.GrandTotal = 0;
    //   this.shoppingCart.Count = '';
    // }
    // this.cartProduct.Product = product;
    // this.cartProduct.AttributeId = 1;
    // this.cartProduct.Count = 1;
    // this.cartProduct.Type = 'type';
    // this.shoppingCart.Products.push(this.cartProduct);
    // localStorage.setItem(ConstValue.ShoppingCart, JSON.stringify(this.shoppingCart));
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
