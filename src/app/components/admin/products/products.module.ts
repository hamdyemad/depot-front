import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { NgxShimmerLoadingModule } from 'ngx-shimmer-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateProductComponent } from './update-product/update-product.component';
@NgModule({
  declarations: [AddProductComponent, ProductsComponent, UpdateProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxShimmerLoadingModule
  ]
})
export class ProductsModule { }
