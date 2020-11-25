import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRepertoriesComponent } from './all-repertories.component';

describe('AllRepertoriesComponent', () => {
  let component: AllRepertoriesComponent;
  let fixture: ComponentFixture<AllRepertoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRepertoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRepertoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
