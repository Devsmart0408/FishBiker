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
import { AccountComponent } from './account/account.component';
import { RouterModule } from '@angular/router';
import { HeaderService } from './services/header.service';
import { AuthenticationService } from './services/authentication.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptorProvider } from './helpers/error.interceptor';
import { OrderComponent } from './order/order.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ShoppingCartService } from './services/shoppingcart.service';
import { ProductService } from './services/product.service';
import { AccountService } from './services/account.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiComponent } from './_apis/api.component';
import { ChildComponent } from './modal/child.component';
import { CartModalComponent } from './modal/cartmodal.component';
import { SuccessCartModalComponent } from './modal/successcartmodal.component';
import { QuickModalComponent } from './modal/quickmodal.component';
import { ChangePasswordComponent } from './modal/changepassword.component';

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
    SuccessCartModalComponent,
    QuickModalComponent,
    AccountComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule.forRoot(),
    NgbModule
  ],
  providers: [HeaderService, AuthenticationService, ShoppingCartService, ProductService,AccountService, ErrorInterceptorProvider],
  entryComponents: [CartModalComponent, SuccessCartModalComponent,QuickModalComponent, ChangePasswordComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
