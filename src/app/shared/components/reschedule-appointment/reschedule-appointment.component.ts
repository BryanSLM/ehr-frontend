import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { PatientService } from '../../../core/services/patient.service';
import { CatalogosService } from '../../../core/services/catalogos.service';
import { MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import dayjs from 'dayjs';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Skeleton } from 'primeng/skeleton';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { CitasService } from '../../../core/services/cita.service';

@Component({
  selector: 'app-reschedule-appointment',
  standalone: true,
  imports: [
    Dialog,
    CommonModule,
    ButtonModule,
    RippleModule,
    StyleClassModule,
    CommonModule,
    OverlayBadgeModule,
    // Tag,
    Skeleton,
    DatePickerModule,
    SelectModule,
    ReactiveFormsModule,
    // RouterModule,
    InputTextModule,
    Dialog,
  ],
  templateUrl: './reschedule-appointment.component.html',
  // styleUrls: ['./reschedule-appointment.component.css'],
})
export class RescheduleAppointmentComponent implements OnInit {
  @Input() visible = false;
  @Input() idAppointment = undefined;
  @Output() visibleChange = new EventEmitter<boolean>();

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
  constructor(
    private patientsService: PatientService,
    private catalogosService: CatalogosService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private appointmentsService: CitasService,
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
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.getSpecialties();
    }
    this.getAppointmentById();
    console.log('ID de la cita:', this.idAppointment);
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

  currentStep = 0;
  loadingForm = false;

  get profile() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }
  getAppointmentById() {
    this.loadingForm = true;
    if (!this.idAppointment) {
      console.error('No se proporcionó un ID de cita');
      return;
    }
    this.appointmentsService.getCitaById(this.idAppointment).subscribe({
      next: (data: any) => {
        console.log('Cita:', data);
        // this.appointments = data;
        this.appointmentForm.patchValue({
          date: dayjs(data.fecha, 'YYYY-MM-DD').toDate(),
          time: data.hora.slice(0, 5),
          doctorId: data.doctor.id,
          specialty: data.doctor.especialidades?.id,
          consultorio: data.consultorioId,
        });
        this.consultarHorarioDisponible();
        this.loadingForm = false;
      },
      error: (error) => {
        console.error('Error fetching appointment:', error);
        const message = error.error?.message || 'Error al cargar la cita';
        this.messageService.add({
          severity: 'error',
          summary: 'Hubo un problema al cargar la cita',
          detail: message,
        });
        this.loadingForm = false;
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

  nextStep() {
    // if (this.currentStep == 0) {
    //   return;
    // }
    this.currentStep++;
  }
  prevStep() {
    if (this.currentStep == 0) {
      return;
    }
    this.currentStep--;
  }
}
