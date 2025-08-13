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
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import dayjs from 'dayjs';
import { RouterModule } from '@angular/router';
import { formatearFecha } from '../../../../../utils/date.utils';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
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
    InputTextModule,
    Dialog,
    FormsModule,
  ],
  providers: [MessageService],
})
export class CreateAppointmentsComponent implements OnInit {
  today = new Date();
  formattedDate = formatearFecha;
  user: any;
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
  appointmentForm: FormGroup = new FormGroup({});
  loading = true;
  registerForm: FormGroup = new FormGroup({});
  visible = false;

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
    intervalos: { hora: string; disponible: boolean }[];
  }[] = [];

  doctorSelected: any = {};

  specialties: { id: string; name: string }[] = [];

  currentStep = 0;
  loadingForm = false;
  citasDoctor: any = {};

  ngOnInit(): void {
    this.loading = true;
    this.appointmentForm.patchValue({ date: new Date() });
    if (typeof window !== 'undefined') {
      this.getSpecialties();
    }
    this.user = this.profile;
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
  get profile() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
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
    this.patientsService
      .getScheduleAvailable(
        this.appointmentForm.get('specialty')?.value,
        dayjs(this.appointmentForm.get('date')?.value).format('YYYY-MM-DD'),
      )
      .subscribe({
        next: (response) => {
          this.appointmentsAvailable = response;
          const primerDoctor =
            this.appointmentsAvailable[0]?.consultorio?.doctor;
          if (primerDoctor) {
            this.appointmentForm.patchValue({ doctorId: primerDoctor.id });
            this.doctorSelected = this.appointmentsAvailable[0];
          }
          console.log('Horario disponible:', response);
        },
      });
  }
  seleccionarDoctor(event: any) {
    const idSeleccionado = event.value; // este es el id que devuelve el p-select
    this.doctorSelected =
      this.appointmentsAvailable.find(
        (a) => a.consultorio.doctor.id === idSeleccionado,
      ) || null;
  }
  consultorios() {
    return this.appointmentsAvailable
      .map((a) => a.consultorio?.doctor)
      .filter((d): d is NonNullable<typeof d> => !!d)
      .map((d) => ({
        id: d.id,
        name: `${d.nombres} ${d.apellidos}`,
      }));
  }
  seleccionarCita() {
    console.log(
      'Seleccionando cita con los siguientes datos:',
      this.appointmentForm,
    );
    // this.nextStep();
  }
  get specialtyName(): string | undefined {
    const specialtyId = this.appointmentForm.get('specialty')?.value;
    const nameSpecialty = this.specialties.find(
      (item) => item.id === specialtyId,
    )?.name;
    return nameSpecialty;
  }
  get nameDoctor(): string | undefined {
    const doctor = this.appointmentsAvailable.find(
      (item) =>
        item.consultorio.doctor.id ===
        this.appointmentForm.get('doctorId')?.value,
    )?.consultorio.doctor;
    const names = doctor ? `${doctor.nombres} ${doctor.apellidos}` : '';
    return names;
  }
  seleccionarHora(hora: string, doctor: string, consultorioId?: string) {
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
    this.nextStep();
  }
  submitAppointment() {
    this.loadingForm = true;
    console.log('PERFIl DE USUARIO:', this.user.paciente);
    this.appointmentForm.patchValue({
      patientId: this.user.paciente.id,
      identification: this.user.identification,
    });
    if (this.appointmentForm.invalid) {
      console.log('Formulario de cita inválido');
      this.messageService.add({
        severity: 'error',
        summary: 'Error al crear cita',
        detail: 'No se pudo crear la cita',
      });
      this.loadingForm = false;
      this.appointmentForm.markAllAsTouched();
      Object.keys(this.appointmentForm.controls).forEach((key) => {
        const control = this.appointmentForm.get(key);
        if (control?.invalid) {
          console.warn(`Campo inválido: ${key}`, control.errors);
        }
      });
      return;
    }

    this.patientsService
      .createAppointment(this.appointmentForm.value)
      .subscribe({
        next: (response) => {
          console.log('Cita creada:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Registro exitoso',
            detail: 'La cita ha sido creada correctamente',
          });
          this.loadingForm = false;
          this.nextStep();
        },
        error: (error) => {
          const message = error.error?.message || 'Error al crear cita';

          this.messageService.add({
            severity: 'error',
            summary: 'Error al crear cita',
            detail: message,
          });
          console.error('Error al crear cita:', error);
          this.loadingForm = false;
        },
      });
  }

  resetForm() {
    this.appointmentForm.reset();
    this.appointmentForm.patchValue({ date: new Date() });
    this.consultarHorarioDisponible();
    this.currentStep = 0;
  }

  nextStep() {
    this.currentStep++;
  }
  prevStep() {
    if (this.currentStep == 0) {
      return;
    }
    this.currentStep--;
  }
}
