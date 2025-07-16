import { Injectable } from '@angular/core';
import { LabsReportService } from '../../../../../core/services/labs-report.service';
import { Observable } from 'rxjs/internal/Observable';
import {
  LabsReportDetailsI,
  LabsReportI,
} from '../../../../../interfaces/labs-report.interface';

@Injectable({
  providedIn: 'root',
})
export class LabsReportsPatientsService {
  constructor(private readonly labsReportService: LabsReportService) {}

  getLabsReports(): Observable<LabsReportI[]> {
    return this.labsReportService.getLabsReports();
  }

  getLabsReportsWithDetails(id: string): Observable<LabsReportDetailsI> {
    return this.labsReportService.getLabsReportsWithDetails(id);
  }
}
