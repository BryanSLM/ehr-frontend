import { Component } from '@angular/core';
import { RegisterSideImageComponent } from './register-side-image/register-side-image.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ShowConditionsDialogComponent } from './show-conditions-dialog/show-conditions-dialog.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RegisterSideImageComponent,
    RegisterFormComponent,
    ShowConditionsDialogComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isDialogOpen = false;

  toggleDialog(isDialogOpen: boolean): void {
    this.isDialogOpen = isDialogOpen;
    console.log('Dialog status:', this.isDialogOpen);
  }
}
