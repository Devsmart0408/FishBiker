import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';

import { ConstValue } from '../helpers/constValue';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { HeaderService } from '../services/header.service';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shoppingcart.service';

import { Tenant } from '../model/tenant';
import { ProductCategory } from '../model/productCategory';
import { Product } from '../model/product';
import { User } from '../model/user';
import { ShoppingCart, CartProduct} from '../model/shoppingCart';


import { CartModalComponent } from '../modal/cartmodal.component';
import { SuccessCartModalComponent } from '../modal/successcartmodal.component';
import { QuickModalComponent } from '../modal/quickmodal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit
{
  products: Product[];
  tenant: Tenant;
  productCategories: ProductCategory[]
  shoppingCart: ShoppingCart;
  cartTotalPrice: number;
  cartTotalCount: number;
  cartProduct: CartProduct;
  selectCategoryId : any;  
  curUser: User;

  constructor(private router: Router, 
              private headerService: HeaderService, 
              private productService: ProductService,
              private shoppingCartService: ShoppingCartService,
              private modalService: NgbModal) {
    this.shoppingCart = new ShoppingCart();
    this.cartProduct = new CartProduct();
    //this.shoppingCart.Products = [];
  }

  

  ngOnInit() {
    this.getProductCategories();
    this.getAllProducts();
    this.getAllShoppingcarts();
    if(this.headerService.getLocalStorageItemBykey(ConstValue.User)) {
      this.curUser = JSON.parse(localStorage.getItem(ConstValue.User));
    }
  }
  getProductCategories() {
    this.productCategories = JSON.parse(localStorage.getItem(ConstValue.ProductCategory));
    this.selectCategoryId = this.productCategories[0].SubCategories[0].CategoryId
  }
  setCategory(id: any) {
    this.selectCategoryId = id;
  }
  filterProducts(your_collection): any[] {  
    if(this.selectCategoryId == 1){
      return your_collection;
    }else if(your_collection){
      return your_collection.filter(i => i.CategoryId === this.selectCategoryId);
    }
  }
  getAllProducts() {
    this.products = JSON.parse(localStorage.getItem(ConstValue.Product));
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
  showCartModal(product: Product) {
    if(this.get_attr_count(product) == 1) {
      let sel_attr = this.getOneProduct(product);
      this.AddOneToCart(product, sel_attr, 1);
      this.getAllShoppingcarts();
      const scartmodalCharge = this.modalService.open(SuccessCartModalComponent);
      scartmodalCharge.componentInstance.product = product;
      scartmodalCharge.componentInstance.addAttribute = sel_attr;
      return;
    }
    const modalCharge = this.modalService.open(CartModalComponent);
    modalCharge.componentInstance.product = product;
    modalCharge.result.then(product => {
      this.getAllShoppingcarts();
    }, (reason) => {})
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
  goToShoppingCart(shoppingCart: ShoppingCart) {
    this.router.navigateByUrl
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product'], {
      queryParams:
        { id: productId }
    });
  }
  viewCart() {

    if(this.curUser) {
      this.router.navigate(['/shoppingcart']);
    }else {
      this.router.navigate(['/login']);
    }
  }

  viewQuick(product: Product) {
    const modalCharge = this.modalService.open(QuickModalComponent);
    modalCharge.componentInstance.product = product;
    modalCharge.result.then(product => {
      this.getAllShoppingcarts();
    }, (reason) => {})
  }

  addCartCount(product: any) {
    this.shoppingCart.Products.forEach(function(item, index, array) {
      if(item.Product.ProductId == product.Product.ProductId && item.AttributeId == product.AttributeId) {
        item.Count = item.Count + 1;
        return;
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
          return;
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
        array.splice(index, 1);
        return;
      }
    })
    localStorage.setItem(ConstValue.ShoppingCart, JSON.stringify(this.shoppingCart));
    this.headerService.setHeaderShoppingCart();
    this.getAllShoppingcarts();
  }
}
