import {
  Component,
  OnInit
} from "@angular/core";
import {
  NgbActiveModal,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";

import { ShoppingCart, CartProduct} from '../model/shoppingCart';
import { ConstValue } from '../helpers/constValue';
import { Router } from '@angular/router';

@Component({
  templateUrl: "./successcartmodal.component.html"
})

export class SuccessCartModalComponent implements OnInit {
  public addAttribute: any;
  public product: any;
  public shoppingCart: ShoppingCart;
  public cartProduct: CartProduct;
  totalPrice: number;
  totalCounts: number;
  constructor(private router: Router, public scartmodal: NgbActiveModal, private modalService: NgbModal) { 
    this.shoppingCart = new ShoppingCart();
    this.cartProduct = new CartProduct();
  }
  ngOnInit() { 
    let totalPrice = 0;
    let totalCounts = 0;
    this.shoppingCart = JSON.parse(localStorage.getItem(ConstValue.ShoppingCart));
    if(Object.keys(this.shoppingCart).length !== 0) {
      this.shoppingCart.Products.forEach(function(item, index, array) {
        totalPrice = totalPrice + item.Count * item.PricePerUnit;          
        totalCounts = totalCounts + 1;
      })
    } 
    this.totalPrice = totalPrice;
    this.totalCounts = totalCounts;
  }
  goToCheckOut() {
    this.router.navigate(["/shoppingcart"]);
    this.scartmodal.close();
  }
  goToProduct(productId: number) {
    this.router.navigate(['/product'], {
      queryParams:
        { id: productId }
    });
    this.scartmodal.close();
  }
  goToHome() {
    this.router.navigate(['/']);
    this.scartmodal.close();
  }
  goToCart() {
    this.router.navigate(['/shoppingcart']);
    this.scartmodal.close();
  }

}
