import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shoppingcart/shoppingcart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { ContactUsComponent } from './contactus/contactus.component';
import { RouterModule } from '@angular/router';
import { HeaderService } from './services/header.service';
import { AuthenticationService } from './services/authentication.service';
import { FormsModule } from '@angular/forms';
import { ErrorInterceptorProvider } from './helpers/error.interceptor';
import { OrderComponent } from './order/order.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ShoppingCartService } from './services/shoppingcart.service';
import { ProductService } from './services/product.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiComponent } from './_apis/api.component';
import { ChildComponent } from './modal/child.component';
import { CartModalComponent } from './modal/cartmodal.component';
import { SuccessCartModalComponent } from './modal/successcartmodal.component';


@NgModule({
  declarations: [
    ApiComponent,
    AppComponent,
    HomeComponent,
    ProductComponent,
    ShoppingCartComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    ContactUsComponent,
    OrderComponent,
    ChildComponent,
    CartModalComponent,
    SuccessCartModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    LeafletModule.forRoot(),
    NgbModule
  ],
  providers: [HeaderService, AuthenticationService, ShoppingCartService, ProductService, ErrorInterceptorProvider],
  entryComponents: [CartModalComponent, SuccessCartModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
