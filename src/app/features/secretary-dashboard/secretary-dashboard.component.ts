import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { PatientsComponent } from '../patients/patients.component';
import { ConsultoriosComponent } from '../consultorios/consultorios.component';
import { CitasListComponent } from '../citas/citas-list/citas-list.component';
import { PatientService } from '../../core/services/patient.service';

declare var bootstrap: any;

@Component({
  selector: 'app-secretary-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    PatientsComponent, 
    ConsultoriosComponent,
    CitasListComponent
  ],
  templateUrl: './secretary-dashboard.component.html',
  styleUrls: ['./secretary-dashboard.component.css']
})
export class SecretaryDashboardComponent {
  activeTab = 'patients';

  pacientesSinIdentificacion: any[] = [];
  mostrarAlertas: boolean[] = [];

  constructor(private router: Router, private patientService: PatientService) {}

  ngOnInit() {
    this.checkPacientesSinIdentificacion();
    this.enableAutoCloseOnLinkClick(); // 👈 activa el cierre automático del menú hamburguesa
  }

  // 🔹 cierra el menú hamburguesa cuando se selecciona un link
  enableAutoCloseOnLinkClick() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const collapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (collapse) collapse.hide();
      });
    });
  }

  checkPacientesSinIdentificacion() {
    this.patientService.getPatients({}).subscribe({
      next: (data) => {
        this.pacientesSinIdentificacion = (data.patients || data).filter((p: any) =>
          p.tipo_identificacion === 'no_identificado' ||
          (typeof p.cedula === 'string' && p.cedula.startsWith('0000'))
        );
        this.mostrarAlertas = this.pacientesSinIdentificacion.map(() => true);
      },
      error: (error) => {
        console.error('Error al obtener pacientes:', error);
      }
    });
  }

  irAEditarPaciente(paciente: any) {
    this.router.navigate(['/patients', paciente.id, 'edit']);
  }

  setActiveTab(tab: string) {
    console.log('Cambiando a tab:', tab);
    this.activeTab = tab;
  }

  isTabActive(tab: string): boolean {
    return this.activeTab === tab;
  }

  cerrarSesion() {
    // Limpiar el token y otros datos de sesión
    localStorage.removeItem('token');
    localStorage.clear();
    
    // Redirigir al login
    this.router.navigate(['/login']).then(() => {
      console.log('Sesión cerrada exitosamente');
    }).catch(error => {
      console.error('Error al redirigir:', error);
    });
  }
}