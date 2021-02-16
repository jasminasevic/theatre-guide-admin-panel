import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutShowComponent } from './about-show.component';

describe('AboutShowComponent', () => {
  let component: AboutShowComponent;
  let fixture: ComponentFixture<AboutShowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
