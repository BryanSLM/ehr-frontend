import { Injectable } from '@angular/core';
import { CitasService } from '../../core/services/cita.service';
import { UserService } from '../../core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardPacienteService {
  constructor(
    private readonly citasService: CitasService,
    private readonly usersService: UserService,
  ) {}

  getCitasByMonth() {
    return this.citasService.getAppointmentsByMonth();
  }

  getDashboardData() {
    return this.usersService.getDashboardData();
  }
}
