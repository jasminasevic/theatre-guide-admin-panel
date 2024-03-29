import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditDirectorComponent } from './edit-director.component';

describe('EditDirectorComponent', () => {
  let component: EditDirectorComponent;
  let fixture: ComponentFixture<EditDirectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDirectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
