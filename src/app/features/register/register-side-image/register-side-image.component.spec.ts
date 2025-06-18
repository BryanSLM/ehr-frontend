import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSideImageComponent } from './register-side-image.component';

describe('RegisterSideImageComponent', () => {
  let component: RegisterSideImageComponent;
  let fixture: ComponentFixture<RegisterSideImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSideImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterSideImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
