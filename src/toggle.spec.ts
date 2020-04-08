import {Component} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgToggleModule} from './index';
import {createGenericTestComponent, isBrowser} from './test/common';

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  model;
  disabled;
}

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getInput(nativeEl: HTMLElement): HTMLInputElement {
  return <HTMLInputElement>nativeEl.querySelector('input');
}

function createSpaceBarKeyPress(): KeyboardEvent {
  let event;
  if (isBrowser(['ie10', 'ie11'])) {
    event = document.createEvent('KeyboardEvent') as KeyboardEvent;
    event.initKeyboardEvent('keydown', true, true, window, 'Spacebar', 0, 0, 0, 0);
  } else {
    event = new KeyboardEvent('keydown', {key: ' '});
  }
  return event;
}

describe('ngxToggle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
        {declarations: [TestComponent], imports: [NgToggleModule, FormsModule, ReactiveFormsModule]});
  });

  it('should toggle value on click', fakeAsync(() => {
       const fixture = createTestComponent(`
      <ng-toggle [(value)]="model"></ng-toggle>
    `);

       fixture.componentInstance.model = false;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ng-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeTruthy();

       fixture.componentInstance.model = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ng-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeFalsy();
     }));

  it('should toggle value on spacebar key press', fakeAsync(() => {
       const fixture = createTestComponent(`
     <ng-toggle [(value)]="model"></ng-toggle>
   `);

       const spaceKeyPress = createSpaceBarKeyPress();

       fixture.componentInstance.model = false;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ng-toggle').dispatchEvent(spaceKeyPress);
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeTruthy();

       fixture.componentInstance.model = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ng-toggle').dispatchEvent(spaceKeyPress);
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeFalsy();
     }));

  it('should toggle mark input as checked / unchecked based on model change', fakeAsync(() => {
       const fixture = createTestComponent(`
      <ng-toggle [(value)]="model"><input type="checkbox" [(ngModel)]="model" /></ng-toggle>
    `);

       fixture.componentInstance.model = false;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ng-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeTruthy();
       expect(getInput(fixture.nativeElement).checked).toBeTruthy();

       fixture.componentInstance.model = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ng-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeFalsy();
       expect(getInput(fixture.nativeElement).checked).toBeFalsy();
     }));

  it('should do nothing for disabled on click', fakeAsync(() => {
       const fixture = createTestComponent(`
      <ng-toggle [(value)]="model" [disabled]="disabled"></ng-toggle>
    `);

       fixture.componentInstance.model = false;
       fixture.componentInstance.disabled = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ng-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeFalsy();

       fixture.componentInstance.model = true;
       fixture.componentInstance.disabled = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ng-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeTruthy();
     }));

  it('should do nothing for disabled on spacebar key press', fakeAsync(() => {
       const fixture = createTestComponent(`
     <ng-toggle [(value)]="model" [disabled]="disabled"></ng-toggle>
   `);

       const spaceKeyPress = createSpaceBarKeyPress();

       fixture.componentInstance.model = false;
       fixture.componentInstance.disabled = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ng-toggle').dispatchEvent(spaceKeyPress);
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeFalsy();

       fixture.componentInstance.model = true;
       fixture.componentInstance.disabled = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ng-toggle').dispatchEvent(spaceKeyPress);
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeTruthy();
     }));

  it('should toggle do nothing to input when disabled', fakeAsync(() => {
       const fixture = createTestComponent(`
      <ng-toggle [(value)]="model" [disabled]="disabled"><input type="checkbox" [(ngModel)]="model" [disabled]="disabled" /></ng-toggle>
    `);

       fixture.componentInstance.model = false;
       fixture.componentInstance.disabled = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ng-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeFalsy();
       expect(getInput(fixture.nativeElement).checked).toBeFalsy();

       fixture.componentInstance.model = true;
       fixture.componentInstance.disabled = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ng-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeTruthy();
       expect(getInput(fixture.nativeElement).checked).toBeTruthy();
     }));
});
