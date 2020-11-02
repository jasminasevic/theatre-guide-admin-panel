import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSceneComponent } from './about-scene.component';

describe('AboutSceneComponent', () => {
  let component: AboutSceneComponent;
  let fixture: ComponentFixture<AboutSceneComponent>;

  beforeEach(async(() => {
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
