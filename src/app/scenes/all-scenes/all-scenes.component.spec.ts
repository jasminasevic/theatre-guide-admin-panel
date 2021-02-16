import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllScenesComponent } from './all-scenes.component';

describe('AllScenesComponent', () => {
  let component: AllScenesComponent;
  let fixture: ComponentFixture<AllScenesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllScenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
