import { Injectable } from '@angular/core';
import { TreatmentsService } from '../../../../../core/services/treatments.service';
import { Observable } from 'rxjs';
import {
  TreatmentI,
  TreatmentWithDetailsI,
} from '../../../../../interfaces/treatments.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TreatmentsPatientsService {
  constructor(private readonly treatmentsService: TreatmentsService) {}

  getTreatments(): Observable<TreatmentI[]> {
    return this.treatmentsService.getTreatments();
  }

  getTreatmentWithDetails(id: string): Observable<TreatmentWithDetailsI> {
    return this.treatmentsService.getTreatmentWithDetails(id);
  }
}
