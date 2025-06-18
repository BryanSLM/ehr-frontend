import { Component } from '@angular/core';
import { RegisterSideImageComponent } from './register-side-image/register-side-image.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterSideImageComponent, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {}
