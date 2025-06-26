import { Component, OnInit, AfterViewInit } from '@angular/core';
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
import { HorarioConsultorio } from '../horario/cita-horario-selector/cita-horario-selector.component';
import { PatientService } from '../../../core/services/patient.service';
import { CatalogosService } from '../../../core/services/catalogos.service';
import dayjs from 'dayjs';

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
  ],
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
    private catalogosService: CatalogosService, // Asumiendo que tienes un servicio para obtener catálogos
  ) {
    this.identificationForm = this.formBuilder.group({
      typeIdentity: ['cedula', [Validators.required]],
      identification: ['', [Validators.required]],
    });
    this.registerForm = this.formBuilder.group({
      typeIdentity: ['', [Validators.required]],
      identification: ['', [Validators.required]],
      names: ['', [Validators.required]],
      lastNames: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
    this.appointmentForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      doctor: ['', [Validators.required]],
      specialty: ['', [Validators.required]],
    });
  }
  selectedTypeIdentity = 'cedula' as string | undefined;
  typesIdentity = [
    { name: 'Cedula de identidad', value: 'cedula' },
    { name: 'Pasaporte', value: 'pasaporte' },
  ];
  typesGender = [
    { name: 'Masculino', value: 'male' },
    { name: 'Femenino', value: 'female' },
  ];
  existUser = false;
  modeRegister = false;
  currentStep = 0;
  doctors = [
    {
      name: 'Dr. Juan Perez',
      id: '456222',
      schedule: {
        monday: '9:00',
        tuesday: '9:00-12:00',
        wednesday: '9:00-12:00',
        thursday: '9:00-12:00',
        friday: '9:00-12:00',
      },
    },
    {
      name: 'Dra. Maria Lopez',
      id: '48914',
      horarios: [
        {
          fecha: '2023-10-01',
          dia: 'Lunes',
          horaInicio: '08:00',
          horaFin: '12:00',
        },
        {
          fecha: '2023-10-02',
          dia: 'Martes',
          horaInicio: '08:00',
          horaFin: '12:00',
        },
        {
          fecha: '2023-10-03',
          dia: 'Miércoles',
          horaInicio: '08:00',
          horaFin: '12:00',
        },
        {
          fecha: '2023-10-04',
          dia: 'Jueves',
          horaInicio: '08:00',
          horaFin: '12:00',
        },
        {
          fecha: '2023-10-05',
          dia: 'Viernes',
          horaInicio: '08:00',
          horaFin: '12:00',
        },
      ] as HorarioConsultorio[],
    },
  ];
  especialidades: { id: string; name: string }[] = [];
  appointmentsAvailable: {
    id: 294;
    consultorioId: 79;
    fecha: '2025-06-24';
    horaInicio: '00:00';
    horaFin: '23:11';
    consultorio: {
      doctor: {
        id: string;
        username: string;
      };
    };
    intervalos: string[];
  }[] = [];
  ngOnInit() {
    this.appointmentForm.patchValue({ date: new Date() });
    if (typeof window !== 'undefined') {
      this.getSpecialties();
    }
    console.log('CitaNewComponent initialized');
  }

  nextStep() {
    if (this.currentStep == 0 && !this.existUser) {
      this.modeRegister = true;
      return;
    }
    this.currentStep++;
  }
  imprimir() {
    console.log(this.selectedTypeIdentity);
  }
  consultarUsuario() {
    if (this.identificationForm.invalid) {
      console.log('Formulario de identificación inválido');
      this.identificationForm.markAllAsTouched(); // Marca todo como tocado para mostrar errores
      return;
    }
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
        },
        error: (error) => {
          console.error('Error al cargar pacientes:', error);
          this.existUser = false;
          this.registerForm.reset();
          this.nextStep();
        },
      });
  }
  crearUsuario() {
    if (this.registerForm.invalid) {
      console.log('Formulario de identificación inválido');
      this.registerForm.markAllAsTouched(); // Marca todo como tocado para mostrar errores
      return;
    }
    console.log('Creando usuario con los siguientes datos:', this.registerForm);
    this.existUser = true; // Simulamos que el usuario fue creado exitosamente
    this.nextStep();
  }
  seleccionarCita() {
    console.log(
      'Seleccionando cita con los siguientes datos:',
      this.appointmentForm,
    );
    this.nextStep();
  }
  get specialtyName(): string | undefined {
    const specialtyId = this.appointmentForm.get('specialty')?.value;
    console.log('ID de especialidad seleccionada:', specialtyId);
    const nameSpecialty = this.specialties.find(
      (item) => item.id === specialtyId,
    )?.name;
    console.log('Nombre de especialidad seleccionada:', nameSpecialty);
    return nameSpecialty;
  }
  get nameDoctor(): string | undefined {
    const nameDoctor = this.appointmentsAvailable.find(
      (item) =>
        item.consultorio.doctor.id ===
        this.appointmentForm.get('doctor')?.value,
    )?.consultorio.doctor.username;
    console.log('Nombre del doctor:', nameDoctor);

    return nameDoctor;
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
    // const selectedDate = this.appointmentForm.get('date')?.value;
    // const selectedDoctor = this.appointmentForm.get('doctor')?.value;
    // const selectedSpecialty = this.appointmentForm.get('specialty')?.value;

    // console.log(
    //   `Consultando horario disponible para el doctor ${selectedDoctor} en la fecha ${selectedDate} y especialidad ${selectedSpecialty}`,
    // );
    // Aquí se debería implementar la lógica para consultar el horario disponible
    // this.nextStep();
  }
  seleccionarHora(hora: string, doctor: string) {
    this.appointmentForm.patchValue({ time: hora, doctor: doctor });
    console.log('Hora seleccionada:', hora);
    console.log('Formulario de cita actualizado:', this.appointmentForm.value);
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
  formatDate(date: Date): string {
    return dayjs(date).format('YYYY-MM-DD');
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
    // Aquí se debería implementar la lógica para confirmar la cita
    this.nextStep();
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
