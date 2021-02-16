import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditSceneComponent } from './edit-scene.component';

describe('EditSceneComponent', () => {
  let component: EditSceneComponent;
  let fixture: ComponentFixture<EditSceneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
