import { Component } from '@angular/core';
import { CustomNavbarComponent } from '../../shared/components/custom-navbar/custom-navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-paciente',
  standalone: true,
  imports: [CustomNavbarComponent, RouterOutlet],
  templateUrl: './dashboard-paciente.component.html',
  styleUrl: './dashboard-paciente.component.css',
})
export class DashboardPacienteComponent {}
