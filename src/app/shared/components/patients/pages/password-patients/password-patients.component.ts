import { Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBar } from 'primeng/progressbar';
import { PasswordModule } from 'primeng/password';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-password-patients',
  standalone: true,
  templateUrl: './password-patients.component.html',
  styleUrl: './password-patients.component.css',
  imports: [
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    CommonModule,
    OverlayBadgeModule,
    InputTextModule,
    ProgressBar,
    PasswordModule,
    ReactiveFormsModule,
  ],
  providers: [MessageService],
})
export class PasswordPatientsComponent implements OnInit {
  passwordForm: FormGroup = new FormGroup({});
  passwordStrength = { strength: 0, message: 'Muy débil' };

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
  ) {
    this.passwordForm = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  ngOnInit() {
    this.passwordForm.get('newPassword')?.valueChanges.subscribe((value) => {
      this.passwordStrength = this.calculatePasswordStrength(value);
    });
  }
  calculatePasswordStrength = (
    password: string,
  ): { strength: number; message: string } => {
    if (!password) return { strength: 0, message: 'Muy débil' };

    let strength = 0;

    if (password.length >= 8) strength += 20;
    if (password.length >= 12) strength += 10;

    if (/[A-Z]/.test(password)) strength += 15;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    let message = 'Muy débil';
    if (strength > 20) message = 'Débil';
    if (strength > 50) message = 'Media';
    if (strength > 70) message = 'Fuerte';
    if (strength > 90) message = 'Muy fuerte';

    return { strength, message };
  };
  getBarColor(): string {
    const s = this.passwordStrength.strength;

    if (s > 90) return '#22c55e';
    if (s > 70) return '#4ade80';
    if (s > 50) return '#facc15';
    if (s > 20) return '#fb923c';
    return '#f87171';
  }

  passwordMatchValidator: ValidatorFn = (
    form: AbstractControl,
  ): ValidationErrors | null => {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  };

  submitForm() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }
  }
}
