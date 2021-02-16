import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllDirectorsComponent } from './all-directors.component';

describe('AllDirectorsComponent', () => {
  let component: AllDirectorsComponent;
  let fixture: ComponentFixture<AllDirectorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDirectorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
