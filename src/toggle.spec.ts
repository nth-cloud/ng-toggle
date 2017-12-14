import {TestBed, ComponentFixture, async, inject, tick, fakeAsync} from '@angular/core/testing';
import {Component, TemplateRef, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';

import {createGenericTestComponent} from './test/common';
import {NgxToggle, NgxToggleModule} from './index';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

function getInput(nativeEl: HTMLElement): HTMLInputElement {
  return <HTMLInputElement>nativeEl.querySelector('input');
}

describe('ngxToggle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
        {declarations: [TestComponent], imports: [NgxToggleModule, FormsModule, ReactiveFormsModule]});
  });

  it('should toggle value on click', fakeAsync(() => {
       const fixture = createTestComponent(`
      <ngx-toggle [(value)]="model"></ngx-toggle>
    `);

       fixture.componentInstance.model = false;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ngx-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeTruthy();

       fixture.componentInstance.model = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ngx-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeFalsy();
     }));

  it('should toggle mark input as checked / unchecked based on model change', fakeAsync(() => {
       const fixture = createTestComponent(`
      <ngx-toggle [(value)]="model"><input type="checkbox" [(ngModel)]="model" /></ngx-toggle>
    `);

       fixture.componentInstance.model = false;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ngx-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeTruthy();
       expect(getInput(fixture.nativeElement).checked).toBeTruthy();

       fixture.componentInstance.model = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ngx-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeFalsy();
       expect(getInput(fixture.nativeElement).checked).toBeFalsy();
     }));

  it('should do nothing for disabled on click', fakeAsync(() => {
       const fixture = createTestComponent(`
      <ngx-toggle [(value)]="model" [disabled]="disabled"></ngx-toggle>
    `);

       fixture.componentInstance.model = false;
       fixture.componentInstance.disabled = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ngx-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeFalsy();

       fixture.componentInstance.model = true;
       fixture.componentInstance.disabled = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ngx-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeTruthy();
     }));

  it('should toggle do nothing to input when disabled', fakeAsync(() => {
       const fixture = createTestComponent(`
      <ngx-toggle [(value)]="model" [disabled]="disabled"><input type="checkbox" [(ngModel)]="model" [disabled]="disabled" /></ngx-toggle>
    `);

       fixture.componentInstance.model = false;
       fixture.componentInstance.disabled = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ngx-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeFalsy();
       expect(getInput(fixture.nativeElement).checked).toBeFalsy();

       fixture.componentInstance.model = true;
       fixture.componentInstance.disabled = true;
       fixture.detectChanges();
       fixture.nativeElement.querySelector('ngx-toggle').click();
       fixture.detectChanges();
       tick();
       fixture.detectChanges();
       expect(fixture.componentInstance.model).toBeTruthy();
       expect(getInput(fixture.nativeElement).checked).toBeTruthy();
     }));
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  model;
  disabled;
}
