import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext'; //
import { SelectModule } from 'primeng/select';
import { StepsModule } from 'primeng/steps';

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
  ],
  templateUrl: './cita-new.component.html',
  styleUrl: './cita-new.component.css',
})
export class CitaNewComponent {
  ci = '';
  selectedSpecialty = '';
  specialties = [
    { name: 'Cardiology', code: 'CARD' },
    { name: 'Dermatology', code: 'DERM' },
    { name: 'Neurology', code: 'NEURO' },
    { name: 'Pediatrics', code: 'PED' },
    { name: 'Radiology', code: 'RAD' },
  ];
}
