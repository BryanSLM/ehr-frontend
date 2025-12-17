import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ConsultoriosComponent } from '../consultorios/consultorios.component';
import { AdminComponent } from '../admin/admin.component';
import { CatalogosComponent } from '../admin/catalogos/catalogos.component';

declare var bootstrap: any;

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    AdminComponent,    // Agregar aquí
    ConsultoriosComponent,  // Agregar aquí
    CatalogosComponent  // Agregar aquí
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  activeTab = 'admin';
  userRole: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  

  ngOnInit() {
     
    if (!this.authService.isAuthenticated()) {
      console.log('Usuario no autenticado');
      this.router.navigate(['/login']);
      return;
    }

    const userRole = this.authService.getUserRole();
    if (!this.authService.hasRole('administrador')) {
      console.log('Usuario no es administrador');
      this.router.navigate(['/unauthorized']);
      return;
    }

    this.userRole = userRole;
    console.log('Dashboard Admin inicializado - Rol:', this.userRole);

    this.enableAutoCloseOnLinkClick();

  }

   enableAutoCloseOnLinkClick() {
  const navbarCollapse = document.getElementById('navbarMenu');
  if (!navbarCollapse) return;

  const navItems = document.querySelectorAll('.nav-link, .btn-cerrar-sesion');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const collapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
      collapse.hide();
    });
  });
}

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}