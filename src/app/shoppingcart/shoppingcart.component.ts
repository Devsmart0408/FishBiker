import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../model/product';
import { ShoppingCart, CartProduct} from '../model/shoppingCart';
import { ConstValue } from '../helpers/constValue';

@Component({
  templateUrl: './shoppingcart.component.html',
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart: ShoppingCart;
  cartTotalPrice: number;
  cartTotalCount: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAllShoppingcarts();
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
