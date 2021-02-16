import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutRepertoireComponent } from './about-repertoire.component';

describe('AboutRepertoireComponent', () => {
  let component: AboutRepertoireComponent;
  let fixture: ComponentFixture<AboutRepertoireComponent>;

  beforeEach(waitForAsync(() => {
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
