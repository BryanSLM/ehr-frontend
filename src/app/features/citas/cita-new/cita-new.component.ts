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
  identification = '';
  selectedTypeIdentity = 'ci' as string | undefined;
  typesIdentity = [
    { name: 'Cedula de identidad', value: 'ci' },
    { name: 'Pasaporte', value: 'passport' },
  ];
  typesGender = [
    { name: 'Masculino', value: 'male' },
    { name: 'Femenino', value: 'female' },
  ];
  existUser = false;
  modeRegister = false;
  currentStep = 2;
  formRegister = {
    names: '',
    identification: '',
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
    consultorio: '',
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
  nextStep() {
    if (this.currentStep == 0 && !this.existUser) {
      this.modeRegister = true;
      return;
    }
    this.currentStep++;
  }
  imprimir() {
    console.log(this.selectedTypeIdentity);
    // console.log(this.calcularHorasCitas());
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
