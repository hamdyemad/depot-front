import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminHeaderComponent } from './admin-fixed/admin-header/admin-header.component';
import { AdminSideComponent } from './admin-fixed/admin-side/admin-side.component';
import { OrdersComponent } from './orders/orders.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { InvoiceComponent } from './orders/invoice/invoice.component';
import { ChangeStatusOfOrdersComponent } from './orders/change-status-of-orders/change-status-of-orders.component';
import { ShippingComponent } from './orders/shipping/shipping.component';
import { GenerateInfoComponent } from './orders/generate-info/generate-info.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';

@NgModule({
  declarations: [AdminComponent,
    DashboardComponent,
    AdminHeaderComponent,
    AdminSideComponent,
    OrdersComponent,
    OrderDetailsComponent,
    InvoiceComponent,
    ChangeStatusOfOrdersComponent,
    ShippingComponent,
    GenerateInfoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxShimmerLoadingModule
  ]
})
export class AdminModule { }
