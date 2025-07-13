import { Component, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-patients',
  standalone: true,
  templateUrl: './sidebar-patients.component.html',
  styleUrl: './sidebar-patients.component.css',
  imports: [
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    CommonModule,
    OverlayBadgeModule,
    RouterModule,
  ],
})
export class SidebarPatientsComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  sidebarVisible = true;
  favoritesExpanded = true;
  applicationExpanded = true;
  reportsExpanded = false;
  revenueExpanded = false;

  itemsSidebar = [
    {
      group: 'general',
      label: 'General',
      children: [
        {
          label: 'Inicio',
          icon: 'pi pi-home',
          route: '/patients',
        },
        {
          label: 'Citas',
          icon: 'pi pi-users',
          route: '/patients/appointments',
        },
        {
          label: 'Laboratorio',
          icon: 'pi pi-calendar',
          route: '/patients/labs-reports',
        },
        {
          label: 'Tratamientos',
          icon: 'pi pi-dollar',
          route: '/patients/treatments',
        },
      ],
    },
    {
      group: 'configuration',
      label: 'Configuración',
      children: [
        {
          label: 'Perfil',
          icon: 'pi pi-home',
          route: '/patients/settings/profile',
        },
        {
          label: 'Contraseña',
          icon: 'pi pi-users',
          route: '/patients/settings/password',
        },
      ],
    },
  ];
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  toggleFavorites() {
    this.favoritesExpanded = !this.favoritesExpanded;
  }

  toggleApplication() {
    this.applicationExpanded = !this.applicationExpanded;
  }

  toggleReports() {
    this.reportsExpanded = !this.reportsExpanded;
  }

  toggleRevenue() {
    this.revenueExpanded = !this.revenueExpanded;
  }

  onMenuItemClick(item: string) {
    console.log('Menu item clicked:', item);
    // Aquí puedes agregar la lógica de navegación
  }
}
