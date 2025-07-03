import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activate-account-dialog',
  standalone: true,
  imports: [ButtonModule, DialogModule, CommonModule, ReactiveFormsModule],
  templateUrl: './activate-account-dialog.component.html',
  styleUrl: './activate-account-dialog.component.css',
})
export class ActivateAccountDialogComponent {
  @Input() isDialogOpen = false;
  @Output() emitDialogToogleStatus: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  activateAccountMessage =
    'Te enviamos un correo con un código de activación. Revísalo e ingresa el código para activar tu cuenta.';

  otpForm: FormGroup;
  formSubmitted = false;
  otpValidationSuccess = false;
  validationSuccessMessage = 'Código de activación correcto. Redirigiendo...';

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) {
    this.otpForm = this.fb.group({
      otpCode: this.fb.array(
        Array(6)
          .fill('')
          .map(() =>
            this.fb.control('', {
              nonNullable: true,
              validators: [Validators.required],
            }),
          ),
      ),
    });
  }

  get otpCodeArray(): FormArray {
    return this.otpForm.get('otpCode') as FormArray;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.emitDialogToogleStatus.emit(false);
  }

  onOtpInput(event: any, index: number) {
    const input = event.target;
    const value = input.value.replace(/[^0-9]/g, '');
    input.value = value;
    this.otpCodeArray.at(index).setValue(value);
    if (value && index < 5) {
      const nextInput =
        input.parentElement.querySelectorAll('input')[index + 1];
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  }

  onOtpBackspace(event: any, index: number) {
    const input = event.target;
    if (input.value === '' && index > 0) {
      const prevInput =
        input.parentElement!.querySelectorAll('input')[index - 1];
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  }
  onSubmit() {
    this.formSubmitted = true;
    if (this.otpForm.valid) {
      this.otpForm.reset({
        otpCode: Array(6).fill(''),
      });
      this.otpValidationSuccess = true;
      this.formSubmitted = false;
      setTimeout(() => {
        this.router.navigate(['/login']);
        this.closeDialog();
      }, 1500);
    }
  }

  hasRequiredOtpError(): boolean {
    return this.otpCodeArray.controls.some((control) => control.invalid);
  }
}
