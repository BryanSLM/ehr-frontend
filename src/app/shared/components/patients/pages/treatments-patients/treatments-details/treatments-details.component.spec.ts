import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentsDetailsComponent } from './treatments-details.component';

describe('TreatmentsDetailsComponent', () => {
  let component: TreatmentsDetailsComponent;
  let fixture: ComponentFixture<TreatmentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreatmentsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatmentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
