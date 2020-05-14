import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import * as _ from 'underscore';
import { Product } from '../model/product';
import { CartModalComponent } from '../modal/cartmodal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCart, CartProduct} from '../model/shoppingCart';

@Component({
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  productId: number;
  productObj: any;
  
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private modalService: NgbModal) {

    this.productId = Number(this.activatedRoute.snapshot.queryParams.id);
}

  ngOnInit(): void {
    if (this.productId) {
      this.productObj = this.getProductById(this.productId);
    }
  }

  showCartModal(product: Product) {
    const modalCharge = this.modalService.open(CartModalComponent);
    modalCharge.componentInstance.product = product;
    modalCharge.result.then(product => {
    }, (reason) => {})
  }

  getProductById(productId: number) {
    var products = this.productService.getProductFromLocalStorage();
    var result = _.filter(products, function (n) { return (n.ProductId === productId) })[0];
    return result;
  }


}
