/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllTheatersComponent } from './all-theaters.component';

describe('AllTheatersComponent', () => {
  let component: AllTheatersComponent;
  let fixture: ComponentFixture<AllTheatersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTheatersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTheatersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
