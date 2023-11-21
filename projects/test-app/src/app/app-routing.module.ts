import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
  },
  // {
  //   path: 'forum',
  //   loadChildren: () => import('./modules/forum/forum.module').then(m => m.ForumModule),
  // },
  {
    path: 'f',
    loadChildren: () => import('./forum/forum.routes').then(m => m.FORUM_ROUTES),
  },
  {
    path: 'forums',
    loadChildren: () => import('./forum/forum.routes').then(m => m.FORUM_ROUTES)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
