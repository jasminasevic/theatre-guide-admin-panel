import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutDirectorComponent } from './about-director.component';

describe('AboutDirectorComponent', () => {
  let component: AboutDirectorComponent;
  let fixture: ComponentFixture<AboutDirectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
