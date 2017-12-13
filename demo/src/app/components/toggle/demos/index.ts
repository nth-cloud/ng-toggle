import {NgxdToggleBasic} from './basic/toggle-basic';
import {NgxdToggleInput} from './input/toggle-input';

export const DEMO_DIRECTIVES = [NgxdToggleBasic, NgxdToggleInput];

export const DEMO_SNIPPETS = {
  'basic': {
    'code': require('!!prismjs-loader?lang=typescript!./basic/toggle-basic'),
    'markup': require('!!prismjs-loader?lang=markup!./basic/toggle-basic.html')
  }/*,
  'input': {
    'code': require('!!prismjs-loader?lang=typescript!./input/toggle-input'),
    'markup': require('!!prismjs-loader?lang=markup!./input/toggle-input.html')
  }*/
};
