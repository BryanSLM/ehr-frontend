import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext'; //
import { SelectModule } from 'primeng/select';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { PatientService } from '../../../core/services/patient.service';
import { CatalogosService } from '../../../core/services/catalogos.service';
import dayjs from 'dayjs';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cita-new',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    SelectModule,
    StepsModule,
    ButtonModule,
    DatePickerModule,
    ReactiveFormsModule,
    Toast,
    RouterModule,
  ],
  providers: [MessageService],

  templateUrl: './cita-new.component.html',
  styleUrl: './cita-new.component.css',
})
export class CitaNewComponent implements OnInit {
  identificationForm: FormGroup = new FormGroup({});
  registerForm: FormGroup = new FormGroup({});
  appointmentForm: FormGroup = new FormGroup({});
  specialties: { id: string; name: string }[] = [];
  constructor(
    private patientService: PatientService,
    private formBuilder: FormBuilder,
    private catalogosService: CatalogosService,
    private messageService: MessageService,
  ) {
    this.identificationForm = this.formBuilder.group({
      typeIdentity: [this.typesIdentity[0]?.value, [Validators.required]],
      identification: ['', [Validators.required]],
    });
    this.registerForm = this.formBuilder.group({
      typeIdentity: [this.typesIdentity[0]?.value, [Validators.required]],
      identification: ['', [Validators.required]],
      names: ['', [Validators.required]],
      lastNames: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      id: [''],
    });
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
  selectedTypeIdentity = 'cedula' as string | undefined;
  typesIdentity = [] as { name: string; value: string }[];
  typesGender = [
    { name: 'Masculino', value: 'M' },
    { name: 'Femenino', value: 'F' },
  ];
  existUser = false;
  modeRegister = false;
  currentStep = 0;
  especialidades: { id: string; name: string }[] = [];
  appointmentsAvailable: {
    id: 294;
    consultorioId: 79;
    fecha: '2025-06-24';
    horaInicio: '00:00';
    horaFin: '23:11';
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
  loadingForm = false;

  ngOnInit() {
    this.appointmentForm.patchValue({ date: new Date() });
    if (typeof window !== 'undefined') {
      this.getSpecialties();
    }
    this.getIdentificationTypes();
  }

  nextStep() {
    if (this.currentStep == 0 && !this.existUser) {
      this.modeRegister = true;
      return;
    }
    this.currentStep++;
  }
  consultarUsuario() {
    if (this.identificationForm.invalid) {
      console.log('Formulario de identificación inválido');
      this.identificationForm.markAllAsTouched();
      this.loadingForm = false;

      return;
    }
    this.loadingForm = true;

    this.patientService
      .getPatientByIdentification(
        this.identificationForm.get('typeIdentity')?.value,
        this.identificationForm.get('identification')?.value,
      )
      .subscribe({
        next: (response) => {
          console.log('Usuario encontrado:', response);
          this.existUser = true;
          this.registerForm.patchValue(response);
          this.nextStep();
          this.loadingForm = false;
        },
        error: (error) => {
          console.error('Error al cargar pacientes:', error);
          this.existUser = false;
          this.registerForm.reset();
          this.nextStep();
          this.loadingForm = false;
        },
      });
  }
  crearUsuario() {
    this.loadingForm = true;
    if (this.registerForm.invalid) {
      console.log('Formulario de identificación inválido');
      this.registerForm.markAllAsTouched();
      this.loadingForm = false;
      return;
    }
    this.patientService
      .createPatientExternal(this.registerForm.value)
      .subscribe({
        next: (response) => {
          console.log('Usuario creado:', response);
          this.registerForm.patchValue(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Registro exitoso',
            detail: 'Usuario creado correctamente',
          });
          this.existUser = true;
          this.loadingForm = false;
          this.nextStep();
        },
        error: (error) => {
          const message = error.error?.message || 'Error al registrar usuario';

          this.messageService.add({
            severity: 'error',
            summary: 'Hubo un problema al crear el usuario',
            detail: message,
          });
          this.existUser = false;
          this.loadingForm = false;
        },
      });
  }
  seleccionarCita() {
    this.loadingForm = true;
    console.log(
      'Seleccionando cita con los siguientes datos:',
      this.appointmentForm,
    );
    this.loadingForm = false;
    this.nextStep();
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
  consultarHorarioDisponible() {
    // if (this.appointmentForm.invalid) {
    //   console.log('Formulario de cita inválido');
    //   this.appointmentForm.markAllAsTouched(); // Marca todo como tocado para mostrar errores
    //   return;
    // }
    if (!this.appointmentForm.get('specialty')?.value) {
      console.log('Debe seleccionar una especialidad');
      return;
    }

    this.patientService
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
  seleccionarHora(hora: string, doctor: string, consultorioId?: string) {
    console.log('REGISTER FORM:', this.registerForm.value);
    console.log('APPOINTMENT FORM:', this.appointmentForm.value);
    this.appointmentForm.patchValue({
      time: hora,
      doctorId: doctor,
      consultorio: consultorioId,
      patientId: this.registerForm.get('id')?.value,
      identification: this.registerForm.get('identification')?.value,
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
  formatDate(
    date: Date,
    format: 'YYYY-MM-DD' | 'DD-MM-YYYY' | 'YYYY-MM-DD HH:mm:ss' = 'DD-MM-YYYY',
  ): string {
    return dayjs(date).format(format);
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
    if (this.appointmentForm.invalid) {
      console.log('Formulario de cita inválido');
      this.messageService.add({
        severity: 'error',
        summary: 'Error al crear cita',
        detail: 'No se pudo crear la cita',
      });
      this.loadingForm = false;
      this.appointmentForm.markAllAsTouched();
      return;
    }

    this.patientService
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
  getIdentificationTypes() {
    this.catalogosService.getIdentificationTypes().subscribe({
      next: (response) => {
        const types = response.data;
        this.typesIdentity = types.map(
          (type: { name: string; id: string }) => ({
            name: type.name,
            value: type.id,
          }),
        );
        this.identificationForm.patchValue({
          typeIdentity: this.typesIdentity[0]?.value,
        });
      },
      error: (error) => {
        console.error('Error fetching identification types:', error);
      },
    });
  }

  prevStep() {
    if (this.currentStep == 0) {
      if (this.modeRegister) {
        this.modeRegister = false;
      }
      return;
    }
    this.currentStep--;
  }
}
