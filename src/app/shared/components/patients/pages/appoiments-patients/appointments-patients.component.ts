import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Tag } from 'primeng/tag';
import { PatientService } from '../../../../../core/services/patient.service';
import { Skeleton } from 'primeng/skeleton';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-appointments-patients',
  standalone: true,
  templateUrl: './appointments-patients.component.html',
  styleUrl: './appointments-patients.component.css',
  imports: [
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    CommonModule,
    OverlayBadgeModule,
    Tag,
    Skeleton,
    RouterModule,
  ],
  providers: [MessageService],
})
export class AppointmentsPatientsComponent implements OnInit {
  appointments: {
    doctor: {
      nombres: string;
      apellidos: string;
      especialidades: {
        name: string;
      };
    };
    fecha: string;
    hora: string;
    estado: string;
  }[] = [];
  loading = true;
  constructor(
    private patientsService: PatientService,
    private messageService: MessageService,
  ) {}
  ngOnInit(): void {
    this.loading = true;
    this.patientsService.getAppointmentByIdentification().subscribe({
      next: (data) => {
        this.appointments = data.data;
        console.log('Citas:', this.appointments);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching appointments:', error);
        this.loading = false;

        const message = error.error?.message || 'Error al registrar usuario';

        this.messageService.add({
          severity: 'error',
          summary: 'Hubo un problema al cargar las citas',
          detail: message,
        });
      },
    });
  }
}
