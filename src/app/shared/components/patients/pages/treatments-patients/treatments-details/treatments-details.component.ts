import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentsPatientsService } from '../treatments-patients.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TreatmentWithDetailsI } from '../../../../../../interfaces/treatments.interfaces';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-treatments-details',
  standalone: true,
  imports: [TableModule, ButtonModule, Skeleton, Tag],
  templateUrl: './treatments-details.component.html',
  styleUrl: './treatments-details.component.css',
})
export class TreatmentsDetailsComponent implements OnInit {
  treatment: TreatmentWithDetailsI = {
    id: '',
    name: '',
    paciente_id: 0,
    medico_id: 0,
    fecha_inicio: '',
    fecha_fin: '',
    observaciones: '',
    medico: {},
    detallesTratamiento: [],
  };
  loading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly treatmentsPatientsService: TreatmentsPatientsService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.treatmentsPatientsService.getTreatmentWithDetails(id).subscribe({
        next: (data) => {
          console.log('Detalles del tratamiento:', data);
          this.treatment = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al cargar detalles del tratamiento', err);
          this.loading = false;
        },
      });
    }
  }

  formatDate(fecha: string | undefined): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const anio = d.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
