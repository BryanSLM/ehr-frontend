import { Component, OnInit } from '@angular/core';
import { ProfileI } from '../../../../../../interfaces/profile.interface';

@Component({
  selector: 'app-profile-data',
  standalone: true,
  imports: [],
  templateUrl: './profile-data.component.html',
  styleUrl: './profile-data.component.css',
})
export class ProfileDataComponent implements OnInit {
  profile: ProfileI | null = null;
  profileGetError: string | null = null;

  getProfile() {
    const profile = localStorage.getItem('user');
    if (profile) {
      this.profile = JSON.parse(profile);
    } else {
      this.profileGetError = 'No profile data found';
    }
  }

  ngOnInit() {
    this.getProfile();
  }

  buildName() {
    if (this.profile) {
      if (
        this.profile.paciente.segundo_nombre &&
        this.profile.paciente.apellido_materno
      ) {
        return `${this.profile.paciente.primer_nombre} ${this.profile.paciente.segundo_nombre} ${this.profile.paciente.apellido_paterno} ${this.profile.paciente.apellido_materno}`;
      }
      return `${this.profile.paciente.primer_nombre} ${this.profile.paciente.apellido_paterno}`;
    }
    return '';
  }

  getGender() {
    switch (this.profile?.paciente.genero) {
      case 'H':
        return 'Masculino';
      case 'M':
        return 'Femenino';
      default:
        return 'No especificado';
    }
  }

  formatDate(fecha: string | undefined): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const anio = d.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  getCivilStatus(estadoCivil: string | null | undefined): string {
    switch (estadoCivil) {
      case 'S':
        return 'Soltero';
      case 'C':
        return 'Casado';
      case 'D':
        return 'Divorciado';
      case 'V':
        return 'Viudo';
      case 'UL':
        return 'Unión Libre';
      default:
        return 'No especificado';
    }
  }
}
