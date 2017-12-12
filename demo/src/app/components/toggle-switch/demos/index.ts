import {NgtsdToggleSwitchBasic} from './basic/toggle-switch-basic';
import {NgtsdToggleSwitchInput} from './input/toggle-switch-input';

export const DEMO_DIRECTIVES = [NgtsdToggleSwitchBasic, NgtsdToggleSwitchInput];

export const DEMO_SNIPPETS = {
  'basic': {
    'code': require('!!prismjs-loader?lang=typescript!./basic/toggle-switch-basic'),
    'markup': require('!!prismjs-loader?lang=markup!./basic/toggle-switch-basic.html')
  },
  'checkbox': {
    'code': require('!!prismjs-loader?lang=typescript!./input/toggle-switch-input'),
    'markup': require('!!prismjs-loader?lang=markup!./input/toggle-switch-input.html')
  }
};
