import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup.component';
import { UiCommonModule } from 'projects/ui-common/src/public-api';


@NgModule({
  declarations: [
    AuthComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    UiCommonModule
  ]
})
export class AuthModule { }
