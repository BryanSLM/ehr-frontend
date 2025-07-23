import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

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
    Menu,
    RouterModule,
  ],
})
export class NavbarPatientsComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  sidebarVisible = true;
  favoritesExpanded = true;
  applicationExpanded = true;
  reportsExpanded = false;
  revenueExpanded = false;
  itemsAvatar: MenuItem[] = [
    {
      label: 'Configuración',
      icon: PrimeIcons.COG,
      routerLink: '/patients/settings/profile',
    },
    {
      label: 'Cerrar sesión',
      icon: PrimeIcons.SIGN_OUT,
      command: () => this.logout(),
    },
  ];
  @Input() user: any;

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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onMenuItemClick(item: string) {
    console.log('Menu item clicked:', item);
  }
}
