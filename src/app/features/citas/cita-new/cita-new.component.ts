import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  ],
  templateUrl: './cita-new.component.html',
  styleUrl: './cita-new.component.css',
})
export class CitaNewComponent implements OnInit {
  constructor(private patientService: PatientService) {}
  identification = '';
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
  formRegister = {
    identification: '',
    names: '',
    lastNames: '',
    email: '',
    phone: '',
    birthdate: '',
    gender: '',
  };

  formAppointment = {
    date: new Date('2025-06-09'),
    time: '',
    doctor: '',
    specialty: '',
  };
  user: any = {
    names: 'Juan',
    lastNames: 'Perez',
    identification: '123456789',
    email: 'vladimirortiz1230@gmail.com',
    phone: '0987654321',
    birthdate: '1990-01-01',
    gender: 'male',
  };
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
  consultarUsuario(identification: string) {
    this.patientService
      .getPatientByIdentification(this.selectedTypeIdentity!, identification)
      .subscribe({
        next: (response) => {
          console.log('Usuario encontrado:', response);
          this.user = response;
          this.existUser = true;

          if (identification === '1755449004') {
            this.formRegister = { ...this.user };
          } else {
            this.formRegister = {
              names: '',
              identification: '',
              lastNames: '',
              email: '',
              phone: '',
              birthdate: '',
              gender: '',
            };
          }
          this.nextStep();
        },
        error: (error) => {
          console.error('Error al cargar pacientes:', error);
          this.existUser = false;
          this.formRegister = {
            names: '',
            identification: '',
            lastNames: '',
            email: '',
            phone: '',
            birthdate: '',
            gender: '',
          };
          this.nextStep();
        },
      });
  }
  crearUsuario() {
    console.log('Creando usuario con los siguientes datos:', this.formRegister);
    // Aquí se podría hacer una llamada a un servicio para crear el usuario
    this.existUser = true; // Simulamos que el usuario fue creado exitosamente
    this.user = { ...this.formRegister }; // Actualizamos el usuario con los datos del formulario
    this.nextStep();
  }
  seleccionarCita() {
    console.log(
      'Seleccionando cita con los siguientes datos:',
      this.formAppointment,
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
    this.formAppointment.date = new Date();
  }
}
