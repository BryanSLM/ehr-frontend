import { Component } from '@angular/core';
import { RegisterSideImageComponent } from './register-side-image/register-side-image.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ActivateAccountDialogComponent } from './activate-account-dialog/activate-account-dialog.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RegisterSideImageComponent,
    RegisterFormComponent,
    ActivateAccountDialogComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isDialogOpen = false;

  constructor() {}

  toggleDialog(isDialogOpen: boolean): void {
    this.isDialogOpen = isDialogOpen;
    console.log('Dialog status:', this.isDialogOpen);
  }
}
