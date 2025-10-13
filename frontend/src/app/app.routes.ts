import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';

export const routes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  canActivate: [],
  children: [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: () => import('./routes/home/home.routes').then(m => m.routes)
    }
  ]
}];
