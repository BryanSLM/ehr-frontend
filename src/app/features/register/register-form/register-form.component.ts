import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { passwordMatchValidator } from '../../../core/validator/src/app/validators/password-match.validator';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { cedulaValidator } from '../../../core/validator/src/app/validators/cedula.validator';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    CommonModule,
    ButtonModule,
    PasswordModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  registerTitle = 'Registrate';
  registerSubtitle = 'Crea una cuenta para continúar con tu atención médica';
  registerForm: FormGroup = new FormGroup({});
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        cedula: ['', [Validators.required, cedulaValidator()]],
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
  }
}
