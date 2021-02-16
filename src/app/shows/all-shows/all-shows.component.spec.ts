import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllShowsComponent } from './all-shows.component';

describe('AllShowsComponent', () => {
  let component: AllShowsComponent;
  let fixture: ComponentFixture<AllShowsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AllShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
