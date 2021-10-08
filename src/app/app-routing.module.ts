import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions  } from '@angular/router';
import { AboutComponent, LoginComponent, PathNotFoundComponent, MessagesComponent } from './layout';
import { AuthGuard, CustomPreloadingStrategyService  } from './core';

const extraOptions: ExtraOptions = {
  preloadingStrategy: CustomPreloadingStrategyService,
  // enableTracing: true // Makes the router log all its internal events to the console.
};

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: {title: 'About'}
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard],
    data: { preload: true, title: 'Admin Panel' }
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    data: { preload: true, title: 'Users List' }
  },
  {
    path: 'messages',
    component: MessagesComponent,
    outlet: 'messages',
    data: { title: 'Messages block' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    // The router will match this route if the URL requested
    // doesn't match any paths for routes defined in our configuration
    path: '**',
    component: PathNotFoundComponent,
    data: { title: 'Page Not Found' }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, extraOptions)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {}
