import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import {
  LabsReportDetailsI,
  LabsReportI,
} from '../../interfaces/labs-report.interface';

@Injectable({
  providedIn: 'root',
})
export class LabsReportService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getLabsReports(): Observable<LabsReportI[]> {
    return this.http.get<LabsReportI[]>(`${this.apiUrl}/labs-reports/`);
  }

  getLabsReportsWithDetails(id: string): Observable<LabsReportDetailsI> {
    return this.http.get<LabsReportDetailsI>(
      `${this.apiUrl}/labs-reports/details/${id}`,
    );
  }
}
