/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AboutActorComponent } from './about-actor.component';

describe('AboutActorComponent', () => {
  let component: AboutActorComponent;
  let fixture: ComponentFixture<AboutActorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutActorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
