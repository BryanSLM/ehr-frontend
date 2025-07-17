import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsReportDetailsComponent } from './labs-report-details.component';

describe('LabsReportDetailsComponent', () => {
  let component: LabsReportDetailsComponent;
  let fixture: ComponentFixture<LabsReportDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabsReportDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabsReportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
