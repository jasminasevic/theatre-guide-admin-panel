import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepertoireComponent } from './add-repertoire.component';

describe('AddRepertoireComponent', () => {
  let component: AddRepertoireComponent;
  let fixture: ComponentFixture<AddRepertoireComponent>;

  beforeEach(async(() => {
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
