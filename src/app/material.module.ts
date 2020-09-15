import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';


const material = [
  MatSliderModule,
  MatPaginatorModule,
  MatTabsModule,
  MatDialogModule
]

@NgModule({
  imports: [material],
  exports: [material]
})

export class MaterialModule { }
