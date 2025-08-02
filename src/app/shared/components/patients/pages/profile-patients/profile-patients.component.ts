import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { CommonModule } from '@angular/common';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ProfileDataComponent } from './profile-data/profile-data.component';

@Component({
  selector: 'app-profile-patients',
  standalone: true,
  templateUrl: './profile-patients.component.html',
  styleUrl: './profile-patients.component.css',
  imports: [
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    CommonModule,
    OverlayBadgeModule,
    ProfileDataComponent,
  ],
})
export class ProfilePatientsComponent {}
