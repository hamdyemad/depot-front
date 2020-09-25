import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';


const material = [
  MatSliderModule,
  MatPaginatorModule,
  MatTabsModule,
  MatDialogModule,
  MatStepperModule,
  MatFormFieldModule
]

@NgModule({
  imports: [material],
  exports: [material]
})

export class MaterialModule { }
