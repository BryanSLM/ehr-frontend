import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LabsReportsPatientsService } from '../../labs-reports-patients.service';
import {
  LabsReportDetailsI,
  LabsReportI,
} from '../../../../../../../interfaces/labs-report.interface';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PdfGeneratorService } from '../../../../../../../core/services/pdf-generator.service';
import { Skeleton } from 'primeng/skeleton';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-labs-report-details',
  standalone: true,
  imports: [TableModule, ButtonModule, Skeleton, Tag],
  templateUrl: './labs-report-details.component.html',
  styleUrl: './labs-report-details.component.css',
})
export class LabsReportDetailsComponent implements OnInit {
  labsReportDetails: LabsReportDetailsI = {
    id: '',
    labs_report_id: '',
    tipo_examen_id: '',
    valor_resultado: '',
    unidad_medida: '',
    valor_referencia: '',
    interpretacion: '',
    observaciones: '',
    tipoExamen: {},
    labsReport: {
      id: '',
      nombre_examen: '',
      paciente_id: 0,
      fecha_reporte: '',
      medico_solicitante_id: 0,
      estado: '',
      fecha_agendamiento: '',
      medico: {},
    },
  };
  labsReport: LabsReportI = {
    id: '',
    nombre_examen: '',
    paciente_id: 0,
    fecha_reporte: '',
    medico_solicitante_id: 0,
    estado: '',
    fecha_agendamiento: '',
    medico: {},
  };
  medico: any = {};
  reportDetailsId: string | null = null;
  loading = true;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly labsReportsPatientsService: LabsReportsPatientsService,
    private readonly router: Router,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {
    this.route.paramMap.subscribe((params) => {
      this.reportDetailsId = params.get('id');
    });
  }
  ngOnInit(): void {
    this.getLabsReportDetails(this.reportDetailsId || '');
  }

  getLabsReportDetails(id: string): void {
    this.loading = true;
    this.labsReportsPatientsService.getLabsReportsWithDetails(id).subscribe({
      next: (response) => {
        this.labsReportDetails = response;
        this.labsReport = response.labsReport;
        this.medico = response.labsReport.medico;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching labs report details:', error);
        this.loading = false;
      },
    });
  }

  formatDate(fecha: string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const anio = d.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  generateLabReportPdf(): void {
    this.pdfGeneratorService
      .generateLabReportPdf(
        this.labsReportDetails,
        this.medico,
        this.labsReport,
      )
      .then(() => {
        // Handle successful PDF generation
      });
  }

  goBack(): void {
    this.router.navigate(['/patients/labs-reports']);
  }
}
