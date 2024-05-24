import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { userResolver } from '../../resolvers/user.resolver';

const routes: Routes = [
  {
    path: ':username',
    component: UserComponent,
    resolve: {
      user: userResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
