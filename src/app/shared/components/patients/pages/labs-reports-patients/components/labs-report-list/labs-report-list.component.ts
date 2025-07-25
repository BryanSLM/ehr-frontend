import { Component, OnInit } from '@angular/core';
import { LabsReportsPatientsService } from '../../labs-reports-patients.service';
import { LabsReportI } from '../../../../../../../interfaces/labs-report.interface';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-labs-report-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, PaginatorModule, Skeleton],
  templateUrl: './labs-report-list.component.html',
  styleUrl: './labs-report-list.component.css',
})
export class LabsReportListComponent implements OnInit {
  labsReports: LabsReportI[] = [];
  labsReportRows: LabsReportI[][] = [];
  page = 0;
  rows = 6;
  first = 0;
  loading = true;
  constructor(
    private readonly labsReportsPatientsService: LabsReportsPatientsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.getLabsReports();
  }

  getLabsReports(): void {
    this.loading = true;
    this.labsReportsPatientsService.getLabsReports().subscribe({
      next: (response) => {
        this.labsReports = response;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.error('Error fetching labs reports:', error);
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

  get pagedReports() {
    const start = this.page * this.rows;
    return this.labsReports.slice(start, start + this.rows);
  }

  onPageChange(event: any) {
    this.page = event.page;
    this.rows = event.rows;
    this.first = this.page * this.rows;
  }

  goToDetails(id: string): void {
    this.router.navigate(['details', id], { relativeTo: this.route });
  }
}
