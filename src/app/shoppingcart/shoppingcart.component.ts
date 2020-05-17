import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../model/product';
import { ShoppingCart, CartProduct} from '../model/shoppingCart';
import { ConstValue } from '../helpers/constValue';

import { HeaderService } from '../services/header.service';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './shoppingcart.component.html',
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart: ShoppingCart;
  cartTotalPrice: number;
  cartTotalCount: number;
  deliveryFee: number;
  tax: number;
  card_type: any;
  card_num:any;
  start_date:any;
  end_date: any;
  cvv: any;
  submitted = false;
  creditForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public headerService: HeaderService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAllShoppingcarts();
    this.deliveryFee = 0;
    this.tax = 5;
    this.card_type = 'credit';
    this.card_num = '';
    this.start_date = '';
    this.end_date = '';
    this.cvv = '';

    this.creditForm = this.formBuilder.group({
      card_num: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      cvv: ['', Validators.required],
    });
    
  }
  get f() { return this.creditForm.controls; }

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
      }
    })
    localStorage.setItem(ConstValue.ShoppingCart, JSON.stringify(this.shoppingCart));
    this.headerService.setHeaderShoppingCart();
    this.getAllShoppingcarts();
  }
  removeCartCount(product: any) {
    this.shoppingCart.Products.forEach(function(item, index, array) {
      if(item.Product.ProductId == product.Product.ProductId && item.AttributeId == product.AttributeId) {
        if(item.Count > 1) {
          item.Count = item.Count - 1;
        }
      }
    })
    localStorage.setItem(ConstValue.ShoppingCart, JSON.stringify(this.shoppingCart));
    this.headerService.setHeaderShoppingCart();
    this.getAllShoppingcarts();
  }
  deleteCart(product: any) {
    this.shoppingCart.Products.forEach(function(item, index, array) {
      if(item.Product.ProductId == product.Product.ProductId && item.AttributeId == product.AttributeId) {
        array.splice(0, 1);
      }
    })
    localStorage.setItem(ConstValue.ShoppingCart, JSON.stringify(this.shoppingCart));
    this.headerService.setHeaderShoppingCart();
    this.getAllShoppingcarts();
  }
  gotoCheckOut() {
    if(this.card_type == 'credit') {
      this.submitted  = true;
      if(this.creditForm.invalid) {
        return;
      }
    } 
  }

}
