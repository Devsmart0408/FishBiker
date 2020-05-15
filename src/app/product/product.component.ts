import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import * as _ from 'underscore';
import { Product } from '../model/product';
import { CartModalComponent } from '../modal/cartmodal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCart, CartProduct} from '../model/shoppingCart';
import { ConstValue } from '../helpers/constValue';
import { HeaderService } from '../services/header.service';
@Component({
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  productId: number;
  productObj: any;
  public shoppingCart: ShoppingCart;
  public cartProduct: CartProduct;

  constructor(public headerService: HeaderService, private activatedRoute: ActivatedRoute, private productService: ProductService, private modalService: NgbModal) {

    this.productId = Number(this.activatedRoute.snapshot.queryParams.id);
    this.shoppingCart = new ShoppingCart();
    this.cartProduct = new CartProduct();
}

  ngOnInit(): void {
    if (this.productId) {
      this.productObj = this.getProductById(this.productId);
    }
  }

  showCartModal(product: Product) {
    if(this.get_attr_count(product) == 1) {
      let sel_attr = this.getOneProduct(product);
      this.AddOneToCart(product, sel_attr, 1);
      return;
    }
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
  get_attr_count(product: any){
    if(product.Attributes.Type)
      return product.Attributes.Type.length;
    if(product.Attributes.Size)
    return product.Attributes.Size.length;
  }
  getOneProduct(product: any) {
    if(product.Attributes.Type)
      return product.Attributes.Type[0];
    if(product.Attributes.Size)
      return product.Attributes.Size[0];
  }
  AddOneToCart(product: any, sel_attr:any, count: number) {
    let addSelectedAttr = sel_attr;
    let get_shoppingCart = null;

    get_shoppingCart = JSON.parse(localStorage.getItem(ConstValue.ShoppingCart));

    if(get_shoppingCart == null || Object.keys(get_shoppingCart).length === 0) {
      this.shoppingCart.Id = '';
      this.shoppingCart.Products = Array();
      this.shoppingCart.Total = 0;
      this.shoppingCart.Note = '';
      this.shoppingCart.GrandTotal = 0;
      this.shoppingCart.Count = 0;
    }else {
      this.shoppingCart = get_shoppingCart;
    }

    let exist_count = 0;
    this.shoppingCart.Products.forEach(function(item, index, array) {
      if(item.Product.ProductId == product.ProductId && item.AttributeId == addSelectedAttr.AttributeId) {
        item.Count = item.Count + count;
        exist_count = exist_count + 1; 
        return;
      }
    })
    if(exist_count == 0) {
      this.cartProduct.Product = product;
      this.cartProduct.AttributeId = addSelectedAttr.AttributeId;
      this.cartProduct.PricePerUnit = addSelectedAttr.PricePerUnit;
      this.cartProduct.Count = count;
      this.cartProduct.Type = product.Attributes.Type? 'Type' : 'Size';
      this.cartProduct.Attribute = addSelectedAttr.Attribute;
      this.cartProduct.CountryOfOriginId = addSelectedAttr.CountryOfOriginId;
      this.cartProduct.DeliveryType = addSelectedAttr.DeliveryType;
      this.cartProduct.IsSpecialOffer = addSelectedAttr.IsSpecialOffer;
      this.cartProduct.MSRP = addSelectedAttr.MSRP;
      this.cartProduct.MaximumUnitsOfOrder = addSelectedAttr.MaximumUnitsOfOrder;
      this.cartProduct.MaximumUnitsOfOrder = addSelectedAttr.MaximumUnitsOfOrder;
      this.cartProduct.MinimumUnitsOfOrder = addSelectedAttr.MinimumUnitsOfOrder;
      this.cartProduct.Ranking = addSelectedAttr.Ranking;
      this.cartProduct.UnitsInStock = addSelectedAttr.UnitsInStock;
      this.shoppingCart.Products.push(this.cartProduct);
    }
    localStorage.setItem(ConstValue.ShoppingCart, JSON.stringify(this.shoppingCart));
    this.headerService.setHeaderShoppingCart();
  }


}
