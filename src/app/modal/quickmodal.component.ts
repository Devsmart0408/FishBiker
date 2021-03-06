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
import { SuccessCartModalComponent } from '../modal/successcartmodal.component';
import { HeaderService } from '../services/header.service';

@Component({
  templateUrl: "./quickmodal.component.html"
})

export class QuickModalComponent implements OnInit {
  
  public product: any;
  public shoppingCart: ShoppingCart;
  public cartProduct: CartProduct;
  public selectedAttrs: any;
  count: number;
  countInput: any;

  constructor(public headerService: HeaderService, public quickmodal: NgbActiveModal, private modalService: NgbModal) { 
    this.shoppingCart = new ShoppingCart();
    this.cartProduct = new CartProduct();
    this.countInput = [];
  }
  
  ngOnInit() { 
    if(this.product.Attributes.Type)
      this.selectedAttrs = this.product.Attributes.Type;
    if(this.product.Attributes.Size)
      this.selectedAttrs = this.product.Attributes.Size;
    let countInputArray = [];
    this.selectedAttrs.forEach(function(item, index, array) {
        countInputArray[index] = 1;
    })
    this.countInput = countInputArray;
  }
  addCartCount(index: number) {
    this.countInput[index] = this.countInput[index] + 1;
  }
  removeCartCount(index: number) {
    this.countInput[index] = this.countInput[index] - 1;
  }
  
  QuickAddToCart(product: any, cartProduct: any, index: number){
    let count = this.countInput[index];
    let get_shoppingCart;
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
      if(item.Product.ProductId == product.ProductId && item.AttributeId == cartProduct.AttributeId) {
        item.Count = item.Count + count;
        exist_count = exist_count + 1; 
      }
    })

    if(exist_count == 0) {
      this.cartProduct.Product = product;
      this.cartProduct.AttributeId = cartProduct.AttributeId;
      this.cartProduct.PricePerUnit = cartProduct.PricePerUnit;
      this.cartProduct.Count = count;
      this.cartProduct.Type = product.Attributes.Type? 'Type' : 'Size';
      this.cartProduct.Attribute = cartProduct.Attribute;
      this.cartProduct.CountryOfOriginId = cartProduct.CountryOfOriginId;
      this.cartProduct.DeliveryType = cartProduct.DeliveryType;
      this.cartProduct.IsSpecialOffer = cartProduct.IsSpecialOffer;
      this.cartProduct.MSRP = cartProduct.MSRP;
      this.cartProduct.MaximumUnitsOfOrder = cartProduct.MaximumUnitsOfOrder;
      this.cartProduct.MaximumUnitsOfOrder = cartProduct.MaximumUnitsOfOrder;
      this.cartProduct.MinimumUnitsOfOrder = cartProduct.MinimumUnitsOfOrder;
      this.cartProduct.Ranking = cartProduct.Ranking;
      this.cartProduct.UnitsInStock = cartProduct.UnitsInStock;
      this.shoppingCart.Products.push(this.cartProduct);
    }
    localStorage.setItem(ConstValue.ShoppingCart, JSON.stringify(this.shoppingCart));
    this.headerService.setHeaderShoppingCart();
    this.quickmodal.close();
    // const scartmodalCharge = this.modalService.open(SuccessCartModalComponent);
    // scartmodalCharge.componentInstance.product = product;
    // scartmodalCharge.componentInstance.addAttribute = this.selectedAttr;
  }
}
