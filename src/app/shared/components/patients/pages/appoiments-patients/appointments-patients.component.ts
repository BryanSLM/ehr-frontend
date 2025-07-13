import { Component, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
  selector: 'app-appointments-patients',
  standalone: true,
  templateUrl: './appointments-patients.component.html',
  styleUrl: './appointments-patients.component.css',
  imports: [
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    CommonModule,
    OverlayBadgeModule,
  ],
})
export class AppointmentsPatientsComponent {}
