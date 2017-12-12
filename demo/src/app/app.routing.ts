import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DefaultComponent} from './default';
import {GettingStarted} from './getting-started';
import {
    NgtsdToggleSwitch
} from './components';
import {DEFAULT_TAB} from './shared/component-wrapper/component-wrapper.component';

const DEFAULT_API_PATH = {path: '', pathMatch: 'full', redirectTo: DEFAULT_TAB};

const componentRoutes = [{
    path: 'components/toggle-switch',
    children: [
      DEFAULT_API_PATH,
      {path: ':tab', component: NgtsdToggleSwitch}
    ]
  }
];

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: DefaultComponent},
  {path: 'getting-started', component: GettingStarted},
  {path: 'components', pathMatch: 'full', redirectTo: 'components/toggle-switch' },
  ...componentRoutes,
  { path: '**', redirectTo: 'home' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
