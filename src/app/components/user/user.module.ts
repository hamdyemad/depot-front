import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { HomeModule } from './home/home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { OrderComponent } from './order/order.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    MainComponent,
    CartComponent,
    BreadCrumbComponent,
    OrderComponent,
    ProductInfoComponent,
    MyOrdersComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class UserModule { }
