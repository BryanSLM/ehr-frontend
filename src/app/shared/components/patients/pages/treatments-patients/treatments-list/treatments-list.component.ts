import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

import { TreatmentsPatientsService } from '../treatments-patients.service';
import { TreatmentI } from '../../../../../../interfaces/treatments.interfaces';

@Component({
  selector: 'app-treatments-list',
  standalone: true,
  imports: [CommonModule, ButtonModule, PaginatorModule],
  templateUrl: './treatments-list.component.html',
  styleUrl: './treatments-list.component.css',
})
export class TreatmentsListComponent implements OnInit {
  treatments: TreatmentI[] = [];
  page = 0;
  rows = 6;
  first = 0;

  constructor(
    private readonly treatmentsPatientsService: TreatmentsPatientsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getTreatments();
  }

  getTreatments(): void {
    this.treatmentsPatientsService.getTreatments().subscribe({
      next: (response) => {
        this.treatments = response;
      },
      error: (error) => {
        console.error('Error fetching treatments:', error);
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

  get pagedTreatments() {
    const start = this.page * this.rows;
    return this.treatments.slice(start, start + this.rows);
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
