/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AllTheatresComponent } from './all-theatres.component';

describe('AllTheatresComponent', () => {
  let component: AllTheatresComponent;
  let fixture: ComponentFixture<AllTheatresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTheatresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTheatresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
