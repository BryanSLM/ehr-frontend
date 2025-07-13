import { Component } from '@angular/core';
import { CustomNavbarComponent } from '../../custom-navbar/custom-navbar.component';
import { RouterOutlet } from '@angular/router';
import { SidebarPatientsComponent } from '../sidebar-patients/sidebar-patients.component';
import { NavbarPatientsComponent } from '../navbar-patients/navbar-patients.component';

@Component({
  selector: 'app-layout-patients',
  standalone: true,
  templateUrl: './layout-patients.component.html',
  styleUrl: './layout-patients.component.css',
  imports: [
    CustomNavbarComponent,
    RouterOutlet,
    SidebarPatientsComponent,
    NavbarPatientsComponent,
  ],
})
export class LayoutPatientsComponent {}
