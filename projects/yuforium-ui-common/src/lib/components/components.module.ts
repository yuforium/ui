import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './forms/text-input/text-input.component';
import { NavComponent } from './nav/nav/nav.component';



@NgModule({
  declarations: [
    TextInputComponent,
    NavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TextInputComponent
  ]
})
export class ComponentsModule { }
