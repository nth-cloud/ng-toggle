import {NthdToggleBasic} from './basic/toggle-basic';
import {NthdToggleInput} from './input/toggle-input';
import {NthdToggleCustomLabel} from './custom-label/toggle-custom-label';
import {NthdToggleKitchenSink} from './kitchen-sink/toggle-kitchen-sink';

export const DEMO_DIRECTIVES = [NthdToggleBasic, NthdToggleInput, NthdToggleCustomLabel, NthdToggleKitchenSink];

export const DEMO_SNIPPETS = {
  'basic': {
    'code': require('!!raw-loader!./basic/toggle-basic'),
    'markup': require('!!raw-loader!./basic/toggle-basic.html')
  },
  'input': {
    'code': require('!!raw-loader!./input/toggle-input'),
    'markup': require('!!raw-loader!./input/toggle-input.html')
  },
  'custom-label': {
    'code': require('!!raw-loader!./custom-label/toggle-custom-label'),
    'markup': require('!!raw-loader!./custom-label/toggle-custom-label.html')
  },
  'kitchen-sink': {
    'code': require('!!raw-loader!./kitchen-sink/toggle-kitchen-sink'),
    'markup': require('!!raw-loader!./kitchen-sink/toggle-kitchen-sink.html')
  }
};
