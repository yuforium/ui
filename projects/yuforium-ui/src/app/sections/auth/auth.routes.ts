import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignupComponent } from './signup.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];
