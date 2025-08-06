import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DashboardPacienteService } from './dashboard-paciente.service';

@Component({
  selector: 'app-dashboard-paciente',
  standalone: true,
  templateUrl: './dashboard-paciente.component.html',
  styleUrl: './dashboard-paciente.component.css',
  imports: [BaseChartDirective],
})
export class DashboardPacienteComponent implements OnInit {
  appointmentsByMonth: any[] | undefined = [];
  counters: any = {};
  barChartData: {
    labels: string[] | undefined;
    datasets: { data: number[] | undefined; label: string }[];
  } = {
    labels: [],
    datasets: [{ data: [], label: 'Citas' }],
  };
  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: { legend: { display: true } },
  };
  barChartPlugins = [];
  constructor(
    private readonly dashboardPacienteService: DashboardPacienteService,
  ) {}
  ngOnInit(): void {
    this.getDashboardData();
    this.getAppointmentsByMonth();
  }

  getDashboardData(): void {
    this.dashboardPacienteService.getDashboardData().subscribe({
      next: (data) => {
        this.counters = data.counts;
        console.log(this.counters);
      },
    });
  }

  getAppointmentsByMonth(): void {
    this.dashboardPacienteService.getCitasByMonth().subscribe({
      next: (data) => {
        this.appointmentsByMonth = data.data;
        this.barChartData = {
          labels: this.appointmentsByMonth?.map((item: any) => item.mes),
          datasets: [
            {
              data: this.appointmentsByMonth?.map((item: any) => item.count),
              label: 'Citas',
            },
          ],
        };
      },
    });
  }
}
