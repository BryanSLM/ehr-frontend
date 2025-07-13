import { Component, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-patients',
  standalone: true,
  templateUrl: './navbar-patients.component.html',
  styleUrl: './navbar-patients.component.css',
  imports: [
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    CommonModule,
  ],
})
export class NavbarPatientsComponent {
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
          command: () => this.onMenuItemClick('Inicio'),
        },
        {
          label: 'Citas',
          icon: 'pi pi-users',
          command: () => this.onMenuItemClick('Citas'),
        },
        {
          label: 'Citas',
          icon: 'pi pi-calendar',
          command: () => this.onMenuItemClick('Citas'),
        },
        {
          label: 'Tratamientos',
          icon: 'pi pi-dollar',
          command: () => this.onMenuItemClick('Tratamientos'),
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
          command: () => this.onMenuItemClick('Inicio'),
        },
        {
          label: 'Contraseña',
          icon: 'pi pi-users',
          command: () => this.onMenuItemClick('Pacientes'),
        },
      ],
    },
  ];

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

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
