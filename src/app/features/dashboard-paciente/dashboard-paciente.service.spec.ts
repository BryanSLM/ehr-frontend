import { TestBed } from '@angular/core/testing';

import { DashboardPacienteService } from './dashboard-paciente.service';

describe('DashboardPacienteService', () => {
  let service: DashboardPacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardPacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
