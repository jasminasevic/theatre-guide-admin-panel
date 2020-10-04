/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AboutTheatreComponent } from './about-theatre.component';

describe('AboutTheatreComponent', () => {
  let component: AboutTheatreComponent;
  let fixture: ComponentFixture<AboutTheatreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutTheatreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
