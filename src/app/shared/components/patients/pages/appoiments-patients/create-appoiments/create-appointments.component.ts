import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Tag } from 'primeng/tag';
import { PatientService } from '../../../../../../core/services/patient.service';
import { Skeleton } from 'primeng/skeleton';
import { MessageService } from 'primeng/api';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { CatalogosService } from '../../../../../../core/services/catalogos.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import dayjs from 'dayjs';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-create-appointments',
  standalone: true,
  templateUrl: './create-appointments.component.html',
  styleUrl: './create-appointments.component.css',
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
    DatePickerModule,
    SelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [MessageService],
})
export class CreateAppointmentsComponent implements OnInit {
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
  registerForm: FormGroup = new FormGroup({});
  appointmentForm: FormGroup = new FormGroup({});

  constructor(
    private patientsService: PatientService,
    private catalogosService: CatalogosService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
  ) {
    this.appointmentForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      doctorId: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
      consultorio: ['', [Validators.required]],
      patientId: ['', [Validators.required]],
      identification: ['', [Validators.required]],
    });
  }

  appointmentsAvailable: {
    id: string;
    consultorioId: string;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    consultorio: {
      id: string;
      doctor: {
        id: string;
        username: string;
        nombres: string;
        apellidos: string;
      };
    };
    intervalos: string[];
  }[] = [];

  specialties: { id: string; name: string }[] = [];

  ngOnInit(): void {
    this.loading = true;
    if (typeof window !== 'undefined') {
      this.getSpecialties();
    }
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

  getSpecialties() {
    this.catalogosService.getEspecialidades().subscribe({
      next: (specialty) => {
        this.specialties = specialty.data;
        console.log('Especialidades cargadas:', this.specialties);
      },
      error: (error) => {
        console.log('Error al cargar las especialidades:', error);
      },
    });
  }
  consultarHorarioDisponible() {
    if (!this.appointmentForm.get('specialty')?.value) {
      console.log('Debe seleccionar una especialidad');
      return;
    }
    console.log(
      'entro aqui------------->',
      this.appointmentForm.get('date')?.value,
    );

    this.patientsService
      .getScheduleAvailable(
        this.appointmentForm.get('specialty')?.value,
        dayjs(this.appointmentForm.get('date')?.value).format('YYYY-MM-DD'),
      )
      .subscribe({
        next: (response) => {
          this.appointmentsAvailable = response;
          console.log('Horario disponible:', response);
        },
      });
  }
  seleccionarCita() {
    // this.loadingForm = true;
    console.log(
      'Seleccionando cita con los siguientes datos:',
      this.appointmentForm,
    );
    // this.loadingForm = false;
    // this.nextStep();
  }
  seleccionarHora(hora: string, doctor: string, consultorioId?: string) {
    // console.log('REGISTER FORM:', this.registerForm.value);
    console.log('APPOINTMENT FORM:', this.appointmentForm.value);
    this.appointmentForm.patchValue({
      time: hora,
      doctorId: doctor,
      consultorio: consultorioId,
      // patientId: this.registerForm.get('id')?.value,
      // identification: this.registerForm.get('identification')?.value,
    });
  }
  aceptarHorario() {
    if (!this.appointmentForm.get('time')?.value) {
      console.log('Debe seleccionar una hora');
      return;
    }
    const selectedTime = this.appointmentForm.get('time')?.value;
    const selectedDate = this.appointmentForm.get('date')?.value;
    const selectedDoctor = this.appointmentForm.get('doctor')?.value;
    const selectedSpecialty = this.appointmentForm.get('specialty')?.value;

    console.log(
      `Cita confirmada para el doctor ${selectedDoctor} el ${selectedDate} a las ${selectedTime} en la especialidad ${selectedSpecialty}`,
    );
  }
}
