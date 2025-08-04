import { Component, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { RouterOutlet } from '@angular/router';
import { TreatmentsListComponent } from './treatments-list/treatments-list.component';

@Component({
  selector: 'app-treatments-patients',
  standalone: true,
  templateUrl: './treatments-patients.component.html',
  styleUrl: './treatments-patients.component.css',
  imports: [
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    CommonModule,
    OverlayBadgeModule,
    RouterOutlet,
    TreatmentsListComponent,
  ],
})
export class TreatmentsPatientsComponent {}
