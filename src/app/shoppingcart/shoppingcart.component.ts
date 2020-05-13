import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShoppingCart } from '../model/shoppingCart';

@Component({
  templateUrl: './shoppingcart.component.html',
})
export class ShoppingCartComponent implements OnInit {

  shoppingCart: ShoppingCart[];
  constructor(private route: ActivatedRoute) {

    //this.route.params.subscribe((params) => this.shoppingCart = params.id);
    //console.log(this.shoppingCart)
  }

  ngOnInit(): void {
  }

}
