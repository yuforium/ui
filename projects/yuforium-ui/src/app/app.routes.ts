import { Route } from '@angular/router';
import { InternalServerErrorComponent } from './components/page/internal-server-error/internal-server-error.component';
import { PageNotFoundComponent } from './components/page/page-not-found/page-not-found.component';

export const APP_ROUTES: Route[] = [
  // {
  //   path: '',
  //   loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  // },
  {
    path: '',
    loadChildren: () => import('./sections/home/home.routes').then(m => m.HOME_ROUTES)
  },
  {
    path: '',
    loadChildren: () => import('./sections/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  // {
  //   path: 'users',
  //   loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  // },
  {
    path: 'users',
    loadChildren: () => import('./sections/user/user.routes').then(m => m.USER_ROUTES)
  },
  {
    path: 'forums',
    loadChildren: () => import('./sections/forum/forum.routes').then(m => m.FORUM_ROUTES)
  },
  {
    path: '500',
    component: InternalServerErrorComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
