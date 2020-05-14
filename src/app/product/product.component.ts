import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import * as _ from 'underscore';
import { Product } from '../model/product';


@Component({
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  productId: number;
  productObj: any;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {

    this.productId = Number(this.activatedRoute.snapshot.queryParams.id);
}

  ngOnInit(): void {
    if (this.productId) {
      
      this.productObj = this.getProductById(this.productId);
      console.log(this.productObj);
    }
  }


  getProductById(productId: number) {
    var products = this.productService.getProductFromLocalStorage();
    var result = _.filter(products, function (n) { return (n.ProductId === productId) })[0];
    return result;
  }


}
