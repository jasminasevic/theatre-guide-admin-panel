/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditShowComponent } from './edit-show.component';

describe('EditShowComponent', () => {
  let component: EditShowComponent;
  let fixture: ComponentFixture<EditShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
