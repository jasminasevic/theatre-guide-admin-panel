/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllActorsComponent } from './all-actors.component';

describe('AllActorsComponent', () => {
  let component: AllActorsComponent;
  let fixture: ComponentFixture<AllActorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllActorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
