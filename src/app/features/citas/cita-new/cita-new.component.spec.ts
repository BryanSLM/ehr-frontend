import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaNewComponent } from './cita-new.component';

describe('CitaNewComponent', () => {
  let component: CitaNewComponent;
  let fixture: ComponentFixture<CitaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitaNewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
