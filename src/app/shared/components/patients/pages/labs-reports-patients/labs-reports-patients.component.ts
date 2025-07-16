import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-labs-reports-patients',
  standalone: true,
  templateUrl: './labs-reports-patients.component.html',
  styleUrl: './labs-reports-patients.component.css',
  imports: [
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    CommonModule,
    OverlayBadgeModule,
    RouterOutlet,
  ],
})
export class LabsReportsPatientsComponent {}
