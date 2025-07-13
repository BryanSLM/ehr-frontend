import { Component } from '@angular/core';
import { CustomNavbarComponent } from '../../shared/components/custom-navbar/custom-navbar.component';
import { RouterOutlet } from '@angular/router';
import { SidebarPatientsComponent } from '../../shared/components/patients/sidebar-patients/sidebar-patients.component';
import { NavbarPatientsComponent } from '../../shared/components/patients/navbar-patients/navbar-patients.component';

@Component({
  selector: 'app-dashboard-paciente',
  standalone: true,
  templateUrl: './dashboard-paciente.component.html',
  styleUrl: './dashboard-paciente.component.css',
  imports: [
    CustomNavbarComponent,
    RouterOutlet,
    SidebarPatientsComponent,
    NavbarPatientsComponent,
  ],
})
export class DashboardPacienteComponent {}
