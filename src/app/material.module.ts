import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';

const material = [
  MatSliderModule,
  MatPaginatorModule
]

@NgModule({
  imports: [material],
  exports: [material]
})

export class MaterialModule { }
