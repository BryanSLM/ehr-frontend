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
import { HorarioConsultorio } from '../horario/cita-horario-selector/cita-horario-selector.component';
import { PatientService } from '../../../core/services/patient.service';

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
  specialties = [
    { name: 'Cardiología', value: 'cardiology' },
    { name: 'Pediatría', value: 'pediatrics' },
    { name: 'Dermatología', value: 'dermatology' },
    { name: 'Ginecología', value: 'gynecology' },
    { name: 'Oftalmología', value: 'ophthalmology' },
    { name: 'Odontología', value: 'dentistry' },
    { name: 'Traumatología', value: 'traumatology' },
    { name: 'Psiquiatría', value: 'psychiatry' },
    { name: 'Neurología', value: 'neurology' },
  ];
  constructor(
    private patientService: PatientService,
    private formBuilder: FormBuilder,
  ) {
    this.identificationForm = this.formBuilder.group({
      typeIdentity: ['', [Validators.required]],
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
  // calcularHorasCitas(fecha) {}

  prevStep() {
    if (this.currentStep == 0) return;
    this.currentStep--;
  }
  ngOnInit() {
    console.log('CitaNewComponent initialized');
    this.appointmentForm.patchValue({ date: new Date() });
  }
}
