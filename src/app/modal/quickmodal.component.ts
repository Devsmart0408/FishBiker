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

@Component({
  templateUrl: "./quickmodal.component.html"
})

export class QuickModalComponent implements OnInit {
  
  public product: any;
  public shoppingCart: ShoppingCart;
  public cartProduct: CartProduct;
  public selectedAttr: any;
  count: number;

  constructor(public quickmodal: NgbActiveModal, private modalService: NgbModal) { 
    this.shoppingCart = new ShoppingCart();
    this.cartProduct = new CartProduct();
  }
  
  ngOnInit() { 
    if(this.product.Attributes.Type)
      this.selectedAttr = this.product.Attributes.Type[0];
    if(this.product.Attributes.Size)
      this.selectedAttr = this.product.Attributes.Size[0];
  }
  selectAttr() {
    console.log(this.selectedAttr);
  }
  QuickAddToCart(product: any, count: number) {
    let addSelectedAttr = this.selectedAttr;
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

    let exist_count = 0;
    this.shoppingCart.Products.forEach(function(item, index, array) {
      if(item.Product.ProductId == product.ProductId && item.AttributeId == addSelectedAttr.AttributeId) {
        console.log(item);
        item.Count = item.Count + count;
        exist_count = exist_count + 1; 
      }
    })

    if(exist_count == 0) {
      this.cartProduct.Product = product;
      this.cartProduct.AttributeId = this.selectedAttr.AttributeId;
      this.cartProduct.PricePerUnit = this.selectedAttr.PricePerUnit;
      this.cartProduct.Count = count;
      this.cartProduct.Type = product.Attributes.Type? 'Type' : 'Size';
      this.cartProduct.Attribute = this.selectedAttr.Attribute;
      this.cartProduct.CountryOfOriginId = this.selectedAttr.CountryOfOriginId;
      this.cartProduct.DeliveryType = this.selectedAttr.DeliveryType;
      this.cartProduct.IsSpecialOffer = this.selectedAttr.IsSpecialOffer;
      this.cartProduct.MSRP = this.selectedAttr.MSRP;
      this.cartProduct.MaximumUnitsOfOrder = this.selectedAttr.MaximumUnitsOfOrder;
      this.cartProduct.MaximumUnitsOfOrder = this.selectedAttr.MaximumUnitsOfOrder;
      this.cartProduct.MinimumUnitsOfOrder = this.selectedAttr.MinimumUnitsOfOrder;
      this.cartProduct.Ranking = this.selectedAttr.Ranking;
      this.cartProduct.UnitsInStock = this.selectedAttr.UnitsInStock;
      this.shoppingCart.Products.push(this.cartProduct);
    }
    localStorage.setItem(ConstValue.ShoppingCart, JSON.stringify(this.shoppingCart));
    //localStorage.setItem(ConstValue.ShoppingCart, '{}');
    this.quickmodal.close();
    // const scartmodalCharge = this.modalService.open(SuccessCartModalComponent);
    // scartmodalCharge.componentInstance.product = product;
    // scartmodalCharge.componentInstance.addAttribute = this.selectedAttr;
  }

}
