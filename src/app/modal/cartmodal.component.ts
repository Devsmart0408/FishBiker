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

@Component({
  templateUrl: "./cartmodal.component.html"
})

export class CartModalComponent implements OnInit {
  
  public product: any;
  shoppingCart: ShoppingCart;
  cartProduct: CartProduct;

  constructor(public cartmodal: NgbActiveModal, private modalService: NgbModal) { }
  
  ngOnInit() { }
  
  AddToCart(product: any) {
    this.shoppingCart = JSON.parse(localStorage.getItem(ConstValue.ShoppingCart));
    if(Object.keys(this.shoppingCart).length === 0) {
      console.log(this.shoppingCart);
      this.shoppingCart.Id = '';
      this.shoppingCart.Products = Array();
      this.shoppingCart.Total = 0;
      this.shoppingCart.Note = '';
      this.shoppingCart.GrandTotal = 0;
      this.shoppingCart.Count = '';
    }
    this.cartProduct.Product = product;
    this.cartProduct.AttributeId = 1;
    this.cartProduct.Count = 1;
    this.cartProduct.Type = 'type';
    this.shoppingCart.Products.push(this.cartProduct);
    localStorage.setItem(ConstValue.ShoppingCart, JSON.stringify(this.shoppingCart));
  }
  
}
