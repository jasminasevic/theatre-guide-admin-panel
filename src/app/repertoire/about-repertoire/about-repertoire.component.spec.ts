import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutRepertoireComponent } from './about-repertoire.component';

describe('AboutRepertoireComponent', () => {
  let component: AboutRepertoireComponent;
  let fixture: ComponentFixture<AboutRepertoireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutRepertoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutRepertoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
