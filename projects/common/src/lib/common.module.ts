import { NgModule } from '@angular/core';
import { CommonComponent } from './common.component';
import { NavbarComponent } from './nav/navbar/navbar.component';



@NgModule({
  declarations: [
    CommonComponent,
    NavbarComponent
  ],
  imports: [
  ],
  exports: [
    CommonComponent,
    NavbarComponent
  ]
})
export class CommonModule { }
