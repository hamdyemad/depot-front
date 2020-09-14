import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { UserGuard } from './../../guards/user/user.guard';
import { OrderComponent } from './order/order.component';
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: "", component: MainComponent, children: [
      { path: "", loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
      { path: "product/:id/:name", component: ProductInfoComponent },
      { path: "cart", component: CartComponent, canActivate: [UserGuard] },
      { path: "order", component: OrderComponent, canActivate: [UserGuard] },
      { path: "my-orders", component: MyOrdersComponent, canActivate: [UserGuard] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
