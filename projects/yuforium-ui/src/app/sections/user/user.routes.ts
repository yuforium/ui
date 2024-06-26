import { Route } from '@angular/router';
import { UserComponent } from './user.component';
import { userResolver } from '../../resolvers/user.resolver';

export const USER_ROUTES: Route[] = [
  {
    path: ':username',
    component: UserComponent,
    resolve: {
      user: userResolver
    }
  }
];
