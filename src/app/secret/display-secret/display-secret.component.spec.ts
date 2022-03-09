import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySecretComponent } from './display-secret.component';

describe('DisplaySecretComponent', () => {
  let component: DisplaySecretComponent;
  let fixture: ComponentFixture<DisplaySecretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySecretComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
