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
import { CitasService } from '../../../../../core/services/cita.service';
import { Toast } from 'primeng/toast';
import { Dialog } from 'primeng/dialog';
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
    Toast,
    Dialog,
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
    id: number;
  }[] = [];
  loading = true;
  loadingButton = false;
  loadingForm = false;
  visible = false;

  constructor(
    private patientsService: PatientService,
    private messageService: MessageService,
    private appointmentsService: CitasService,
  ) {}
  ngOnInit(): void {
    this.getAppointments();
  }
  getAppointments() {
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

  updateStateAppointment(id: number) {
    this.loadingButton = true;
    this.appointmentsService.updateEstadoCita(id, 'cancelado').subscribe({
      next: (data) => {
        console.log('Estado de citas actualizado:', data);
        this.messageService.add({
          severity: 'success',
          summary: 'Citas actualizadas',
          detail: 'El estado de las citas ha sido actualizado correctamente.',
        });
        this.getAppointments();
        this.loadingButton = false;
      },
      error: (error) => {
        console.error('Error updating appointment state:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error al actualizar citas',
          detail: 'Hubo un problema al actualizar el estado de las citas.',
        });
        this.loadingButton = false;
      },
    });
  }
  rescheduleAppointment() {
    this.loadingButton = true;
    this.visible = true;
    // this.appointmentForm.patchValue({
    //   patientId: this.user.paciente.id,
    //   identification: this.user.identification,
    // });
  }
}
