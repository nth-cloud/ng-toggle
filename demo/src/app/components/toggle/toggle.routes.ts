import { NthdToggleBasic } from "./demos/basic/toggle-basic";
import { NthdToggleInput } from "./demos/input/toggle-input";
import { NthdToggleCustomLabel } from "./demos/custom-label/toggle-custom-label";
import { NthdToggleKitchenSink } from "./demos/kitchen-sink/toggle-kitchen-sink";
import { Routes } from "@angular/router";
import { ComponentWrapper } from "../../shared/component-wrapper/component-wrapper.component";
import { ENVIRONMENT_INITIALIZER, inject } from "@angular/core";
import { NthdDemoListService } from "../../services/demo-list.service";
import { NthdToggleOverviewComponent } from "./overview/toggle-overview.component";
import { NthdExamplesPage } from "../../shared/examples-page/examples.component";
import { NthdApiPage } from "../../shared/api-page/api-page.component";


const OVERVIEW = {
  'basic-usage': 'Basic Usage',
};

const DEMOS = {
  basic: {
    title: 'Basic',
    type: NthdToggleBasic,
    code: require('!!raw-loader!./demos/basic/toggle-basic').default,
    markup: require('!!raw-loader!./demos/basic/toggle-basic.html').default,
  },
  checkbox: {
    title: 'Checkbox',
    type: NthdToggleInput,
    code: require('!!raw-loader!./demos/input/toggle-input').default,
    markup: require('!!raw-loader!./demos/input/toggle-input.html').default,
  },
  'custom-label': {
    title: 'Custom Label',
    type: NthdToggleCustomLabel,
    code: require('!!raw-loader!./demos/custom-label/toggle-custom-label').default,
    markup: require('!!raw-loader!./demos/custom-label/toggle-custom-label.html').default,
  },
  'kitchen-sink': {
    title: 'Everything... and the kitchen sink',
    type: NthdToggleKitchenSink,
    code: require('!!raw-loader!./demos/kitchen-sink/toggle-kitchen-sink').default,
    markup: require('!!raw-loader!./demos/kitchen-sink/toggle-kitchen-sink.html').default,
  }
};

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'overview' },
  {
    path: '',
    component: ComponentWrapper,
    data: {
      bootstrap: 'https://getbootstrap.com/docs/%version%/components/navs/',
    },
    providers: [
      {
        provide: ENVIRONMENT_INITIALIZER,
        multi: true,
        useValue: () => inject(NthdDemoListService).register('toggle', DEMOS, OVERVIEW)
      },
    ],
    children: [
      { path: 'overview', component: NthdToggleOverviewComponent },
      { path: 'examples', component: NthdExamplesPage },
      { path: 'api', component: NthdApiPage },
    ]
  }
];
