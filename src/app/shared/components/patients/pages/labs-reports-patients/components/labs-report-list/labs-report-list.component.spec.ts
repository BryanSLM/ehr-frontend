import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsReportListComponent } from './labs-report-list.component';

describe('LabsReportListComponent', () => {
  let component: LabsReportListComponent;
  let fixture: ComponentFixture<LabsReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabsReportListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabsReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
