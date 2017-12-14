import {NgxdToggleBasic} from './basic/toggle-basic';
import {NgxdToggleInput} from './input/toggle-input';
import {NgxdToggleCustomLabel} from './custom-label/toggle-custom-label';
import {NgxdToggleKitchenSink} from './kitchen-sink/toggle-kitchen-sink';

export const DEMO_DIRECTIVES = [NgxdToggleBasic, NgxdToggleInput, NgxdToggleCustomLabel, NgxdToggleKitchenSink];

export const DEMO_SNIPPETS = {
  'basic': {
    'code': require('!!prismjs-loader?lang=typescript!./basic/toggle-basic'),
    'markup': require('!!prismjs-loader?lang=markup!./basic/toggle-basic.html')
  },
  'input': {
    'code': require('!!prismjs-loader?lang=typescript!./input/toggle-input'),
    'markup': require('!!prismjs-loader?lang=markup!./input/toggle-input.html')
  },
  'custom-label': {
    'code': require('!!prismjs-loader?lang=typescript!./custom-label/toggle-custom-label'),
    'markup': require('!!prismjs-loader?lang=markup!./custom-label/toggle-custom-label.html')
  },
  'kitchen-sink': {
    'code': require('!!prismjs-loader?lang=typescript!./kitchen-sink/toggle-kitchen-sink'),
    'markup': require('!!prismjs-loader?lang=markup!./kitchen-sink/toggle-kitchen-sink.html')
  }
};
