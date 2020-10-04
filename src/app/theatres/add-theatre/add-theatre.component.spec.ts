/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddTheatreComponent } from './add-theatre.component';

describe('AddTheatreComponent', () => {
  let component: AddTheatreComponent;
  let fixture: ComponentFixture<AddTheatreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTheatreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
