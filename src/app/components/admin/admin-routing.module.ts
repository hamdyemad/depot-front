import { AdminsComponent } from './admins/admins/admins.component';
import { GenerateInfoComponent } from './orders/generate-info/generate-info.component';
import { ShippingComponent } from './orders/shipping/shipping.component';
import { ChangeStatusOfOrdersComponent } from './orders/change-status-of-orders/change-status-of-orders.component';
import { InvoiceComponent } from './orders/invoice/invoice.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: "", component: AdminComponent, children: [
      { path: "", component: DashboardComponent },
      { path: "orders", component: OrdersComponent },
      { path: "order/shipping", component: ShippingComponent },
      { path: "order/export", component: GenerateInfoComponent },
      { path: "order/:id", component: OrderDetailsComponent },
      { path: "order/invoice/:id", component: InvoiceComponent },
      { path: "change-status", component: ChangeStatusOfOrdersComponent },
      { path: "products", loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
      { path: "admins", component: AdminsComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
