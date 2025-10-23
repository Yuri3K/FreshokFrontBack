import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { authChildGuard, authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authChildGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./routes/home/home.routes').then(m => m.routes)
      },
    ]
  },

  {
    path: 'login',
    loadChildren: () => import('./routes/login/login.routes').then(m => m.routes)
  },
  {
    path: 'register',
    loadChildren: () => import('./routes/register/register.routes').then(m => m.routes)
  }
];
