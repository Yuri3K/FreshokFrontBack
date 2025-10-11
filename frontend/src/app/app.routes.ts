import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';

export const routes: Routes = [{
  path: '',
  component: HomeComponent,
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
