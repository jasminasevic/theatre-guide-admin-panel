import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddRepertoireComponent } from './add-repertoire.component';

describe('AddRepertoireComponent', () => {
  let component: AddRepertoireComponent;
  let fixture: ComponentFixture<AddRepertoireComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRepertoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRepertoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
