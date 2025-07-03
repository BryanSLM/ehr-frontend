import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { passwordMatchValidator } from '../../../core/validators/password-match.validator';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { cedulaValidator } from '../../../core/validators/cedula.validator';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { RegisterService } from '../service/register.service';
import { Register } from '../../../interfaces/register.interface';
import { CatalogosService } from '../../../core/services/catalogos.service';
import { DatePickerModule } from 'primeng/datepicker';
import { ecuPhoneNumberValidator } from '../../../core/validators/ecu-phone-number.validator';
import { birthDateValidator } from '../../../core/validators/birth-date.validator';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    PasswordModule,
    SelectModule,
    DatePickerModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent implements OnInit {
  registerTitle = 'Registrate';
  currentStep = 1;
  registerButtonMessage = 'Registrarse';
  registerButtonNextStep = 'Siguiente';
  registerSubtitle = 'Crea una cuenta para continúar con tu atención médica';
  registerForm: FormGroup = new FormGroup({});
  registerDetailsForm: FormGroup = new FormGroup({});
  formSubmitted = false;
  identificationTypes = [];
  registerData: Register = {
    username: '',
    email: '',
    identification: '',
    identificationType: '', // Added to match the form control
    password: '',
    role: 'paciente', // Default value for role
    empresa: 'CARDIOVASC', // Default value for empresa
    patient: {
      firstName: '',
      lastName: '',
      birthDate: '',
      gender: '',
      phone: '',
    },
  };
  registerError = false;
  registerErrorMessage = '';
  @Output() registerSuccess: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly registerService: RegisterService,
    private readonly catalogService: CatalogosService,
  ) {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        identification_type: [null, [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        identification: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(10),
            Validators.pattern(/^\d+$/),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirm_password: ['', [Validators.required]],
      },
      {
        validator: [passwordMatchValidator],
      },
    );
    this.registerDetailsForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required, birthDateValidator()]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, ecuPhoneNumberValidator()]],
    });
  }
  ngOnInit(): void {
    this.getIdentificationTypes();
  }

  getIdentificationTypes() {
    this.catalogService.getIdentificationTypes().subscribe({
      next: (response) => {
        const types = response.data;
        this.identificationTypes = types.map((type: any) => ({
          name: type.name,
          code: type.id,
        }));
      },
      error: (error) => {
        console.error('Error fetching identification types:', error);
      },
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    switch (this.currentStep) {
      case 1:
        if (this.registerForm.valid) {
          this.registerData = {
            username: this.registerForm.value.username,
            email: this.registerForm.value.email,
            identification: this.registerForm.value.identification,
            identificationType: this.registerForm.value.identification_type,
            password: this.registerForm.value.password,
            role: 'paciente',
            empresa: 'CARDIOVASC',
            patient: {
              firstName: '',
              lastName: '',
              birthDate: '',
              gender: '',
              phone: '',
            },
          };
          this.nextStep();
          this.formSubmitted = false;
        }
        break;
      case 2:
        this.formSubmitted = true;
        if (this.registerDetailsForm.valid) {
          this.registerData.patient = {
            firstName: this.registerDetailsForm.value.firstName,
            lastName: this.registerDetailsForm.value.lastName,
            birthDate: this.registerDetailsForm.value.birthDate,
            gender: this.registerDetailsForm.value.gender,
            phone: this.registerDetailsForm.value.phone,
          };
          console.log(this.registerData);
          this.registerUser();
        }

        break;
      default:
        break;
    }
  }

  registerUser() {
    this.registerService.register(this.registerData).subscribe({
      next: (response) => {
        console.log(response);
        this.registerForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.registerError = true;
      },
    });
  }

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }
}
