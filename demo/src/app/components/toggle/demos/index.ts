import {NthdToggleBasic} from './basic/toggle-basic';
import {NthdToggleInput} from './input/toggle-input';
import {NthdToggleCustomLabel} from './custom-label/toggle-custom-label';
import {NthdToggleKitchenSink} from './kitchen-sink/toggle-kitchen-sink';

export const DEMO_DIRECTIVES = [NthdToggleBasic, NthdToggleInput, NthdToggleCustomLabel, NthdToggleKitchenSink];

export const DEMO_SNIPPETS = {
  'basic': {
    'code': require('!!raw-loader!./basic/toggle-basic').default,
    'markup': require('!!raw-loader!./basic/toggle-basic.html').default
  },
  'input': {
    'code': require('!!raw-loader!./input/toggle-input').default,
    'markup': require('!!raw-loader!./input/toggle-input.html').default
  },
  'custom-label': {
    'code': require('!!raw-loader!./custom-label/toggle-custom-label').default,
    'markup': require('!!raw-loader!./custom-label/toggle-custom-label.html').default
  },
  'kitchen-sink': {
    'code': require('!!raw-loader!./kitchen-sink/toggle-kitchen-sink').default,
    'markup': require('!!raw-loader!./kitchen-sink/toggle-kitchen-sink.html').default
  }
};
