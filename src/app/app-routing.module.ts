import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shoppingcart/shoppingcart.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactUsComponent } from './contactus/contactus.component';
import { ApiComponent } from './_apis/api.component';
import { AuthGuard } from './helpers/auth.guard';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'product', component: ProductComponent, pathMatch: 'full'},
  { path: 'shoppingcart', component: ShoppingCartComponent , pathMatch:'full'},
  { path: 'notfound', component: NotFoundComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'register', component: RegisterComponent, pathMatch: 'full'},
  { path: 'contactus', component: ContactUsComponent, pathMatch: 'full'},
  { path: 'order', component: OrderComponent, pathMatch: 'full' },
  { path: 'api', component: ApiComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
