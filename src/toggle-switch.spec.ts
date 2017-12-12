import {TestBed, ComponentFixture, async, inject} from '@angular/core/testing';
import {createGenericTestComponent} from './test/common';

import {Component, TemplateRef, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {NgToggleSwitchModule} from './index';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function triggerKeyDown(element: DebugElement, keyCode: number, shiftKey = false) {
  let event = {
    which: keyCode,
    shiftKey: shiftKey,
    defaultPrevented: false,
    propagationStopped: false,
    stopPropagation: function() { this.propagationStopped = true; },
    preventDefault: function() { this.defaultPrevented = true; }
  };
  element.triggerEventHandler('keydown', event);
  return event;
}

describe('ng-toggle-switch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
        {declarations: [TestComponent], imports: [NgToggleSwitchModule, FormsModule, ReactiveFormsModule]});
  });

  it('simple test', () => { expect(true).toBeTruthy('Do it!'); });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
}
