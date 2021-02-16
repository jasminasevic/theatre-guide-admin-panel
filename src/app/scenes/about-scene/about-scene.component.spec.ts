import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutSceneComponent } from './about-scene.component';

describe('AboutSceneComponent', () => {
  let component: AboutSceneComponent;
  let fixture: ComponentFixture<AboutSceneComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
