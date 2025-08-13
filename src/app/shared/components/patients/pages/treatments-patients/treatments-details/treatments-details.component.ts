import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreatmentsPatientsService } from '../treatments-patients.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TreatmentWithDetailsI } from '../../../../../../interfaces/treatments.interfaces';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';
import { PdfService } from '../../../../../../core/services/pdf.service';

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
    motivo_consulta: '',
    detallesTratamiento: [],
    fecha: '',
    prescripciones: {},
  };
  loading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly treatmentsPatientsService: TreatmentsPatientsService,
    private readonly pdfService: PdfService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.treatmentsPatientsService.getTreatmentWithDetails(id).subscribe({
        next: (data) => {
          this.treatment = data;
          this.loading = false;
        },
        error: (err) => {
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

  generateTreatmentPdf(): void {
    const paciente = localStorage.getItem('user');
    const pacienteJson = JSON.parse(paciente || '{}');
    this.pdfService.generarRecetaMedica(this.treatment, pacienteJson.paciente);
  }
}
