import { Routes } from '@angular/router';

import { DefaultComponent } from './default';
import { SupportComponent } from './pages/support/support.component';
import { ROUTES as TOGGLE_ROUTES } from './components/toggle/toggle.routes';
import { GettingStartedPage } from "./pages/getting-started/getting-started.component";

export const ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: DefaultComponent},
  {path: 'getting-started', component: GettingStartedPage},
  {path: 'docs', pathMatch: 'full', redirectTo: 'docs'},
  {path: 'support', component: SupportComponent},
  {
    path: 'docs',
    children: TOGGLE_ROUTES,
  },
  {path: '**', redirectTo: 'home'},
];
