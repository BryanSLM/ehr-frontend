import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {
  TreatmentI,
  TreatmentWithDetailsI,
} from '../../interfaces/treatments.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TreatmentsService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getTreatments(): Observable<TreatmentI[]> {
    return this.http.get<TreatmentI[]>(`${this.apiUrl}/treatments/`);
  }

  getTreatmentWithDetails(id: string): Observable<TreatmentWithDetailsI> {
    return this.http.get<TreatmentWithDetailsI>(
      `${this.apiUrl}/treatments/details/${id}`,
    );
  }
}
