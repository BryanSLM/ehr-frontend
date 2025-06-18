import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { passwordMatchValidator } from '../../../core/validator/src/app/validators/password-match.validator';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { cedulaValidator } from '../../../core/validator/src/app/validators/cedula.validator';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { RegisterService } from '../service/register.service';
import { Register } from '../../../interfaces/register.interface';

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
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  registerTitle = 'Registrate';
  registerSubtitle = 'Crea una cuenta para continúar con tu atención médica';
  registerForm: FormGroup = new FormGroup({});
  formSubmitted = false;
  identificationTypes = [
    { name: 'Cedula', code: '1' },
    { name: 'Pasaporte', code: '2' },
  ];
  registerData: Register = {
    username: '',
    email: '',
    identification: '',
    password: '',
    role: 'paciente', // Default value for role
    empresa: 'CARDIOVASC', // Default value for empresa
  };
  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
  ) {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        identification_type: [null, [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        identification: ['', [Validators.required, cedulaValidator()]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirm_password: ['', [Validators.required]],
      },
      {
        validator: [passwordMatchValidator],
      },
    );
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.valid) {
      this.registerData = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        identification: this.registerForm.value.identification,
        password: this.registerForm.value.password,
        role: 'paciente',
        empresa: 'CARDIOVASC',
      };
      this.registerUser();
    }
  }

  registerUser() {
    this.registerService.register(this.registerData).subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.error(err);
      },
    );
  }
}
