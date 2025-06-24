import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-activate-account-dialog',
  standalone: true,
  imports: [ButtonModule, DialogModule, CommonModule],
  templateUrl: './activate-account-dialog.component.html',
  styleUrl: './activate-account-dialog.component.css',
})
export class ActivateAccountDialogComponent {
  @Input() isDialogOpen = false;
  @Output() emitDialogToogleStatus: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  activateAccountMessage =
    'Te enviamos un correo con un código de activación. Revísalo e ingresa el código para activar tu cuenta.';

  otpCode: string[] = ['', '', '', '', '', ''];

  closeDialog() {
    this.isDialogOpen = false;
    this.emitDialogToogleStatus.emit(false);
  }

  onOtpInput(event: any, index: number) {
    const input = event.target;
    const value = input.value.replace(/[^0-9]/g, '');
    input.value = value;
    this.otpCode[index] = value;
    if (value && index < 5) {
      const nextInput =
        input.parentElement.querySelectorAll('input')[index + 1];
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  }

  onOtpBackspace(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.value === '' && index > 0) {
      const prevInput =
        input.parentElement!.querySelectorAll('input')[index - 1];
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  }

  onSubmit() {
    const otp = this.otpCode.join('');
    this.clearInputs();
    this.closeDialog();
  }

  clearInputs() {
    this.otpCode = ['', '', '', '', '', ''];
    // Limpiar visualmente los inputs OTP
    setTimeout(() => {
      const inputs =
        document.querySelectorAll<HTMLInputElement>('input[otpInput]]');
      inputs.forEach((input) => (input.value = ''));
      if (inputs.length > 0) {
        inputs[0].focus();
      }
    });
  }
}
