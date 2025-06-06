import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext'; //
import { SelectModule } from 'primeng/select';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';

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
export class CitaNewComponent {
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
  modeRegister = true;
  currentStep = 0;
  formRegister = {
    names: '',
    identification: '',
    lastNames: '',
    email: '',
    phone: '',
    birthdate: '',
    gender: '',
  };
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

  prevStep() {
    if (this.currentStep == 0) return;
    this.currentStep--;
  }
}
