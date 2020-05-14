import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header.service';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shoppingcart.service';
import { Product } from '../model/product';
import { Tenant } from '../model/tenant';
import { ProductCategory } from '../model/productCategory';
import { ShoppingCart, CartProduct} from '../model/shoppingCart';
import { ConstValue } from '../helpers/constValue';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  cartProduct: CartProduct;
  selectCategoryId : any;  
 
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
  }
  getProductCategories() {
    this.productCategories = JSON.parse(localStorage.getItem(ConstValue.ProductCategory));
    this.selectCategoryId = this.productCategories[0].SubCategories[0].CategoryId
  }
  setCategory(id: any) {
    this.selectCategoryId = id;
  }
  filterProducts(your_collection): any[] {  
    return your_collection.filter(i => i.CategoryId === this.selectCategoryId);
  }
  getAllProducts() {
    this.products = JSON.parse(localStorage.getItem(ConstValue.Product));
  }
  getAllShoppingcarts() {
    this.shoppingCart = JSON.parse(localStorage.getItem(ConstValue.ShoppingCart));
  }
  showCartModal(product: Product) {
    const modalCharge = this.modalService.open(CartModalComponent);
    modalCharge.componentInstance.product = product;
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

  viewQuick(product: Product) {
    const modalCharge = this.modalService.open(QuickModalComponent);
    modalCharge.componentInstance.product = product;
  }

}
