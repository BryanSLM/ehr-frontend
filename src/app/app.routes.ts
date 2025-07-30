import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PatientsComponent } from './features/patients/patients.component';
import { ConsultoriosComponent } from './features/consultorios/consultorios.component';
import { UnauthorizedComponent } from './features/NoAutorizado/unauthorized.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ForgotPasswordComponent } from './features/recuperar_contraseña/forgot-password.component';
import { ResetPasswordComponent } from './features/recuperar_contraseña/reset-password.component';
import { PatientFormComponent } from './features/patients/patient-form/patient-form.component';
import { SecretaryDashboardComponent } from './features/secretary-dashboard/secretary-dashboard.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { CitasListComponent } from './features/citas/citas-list/citas-list.component';
import { CitaFormComponent } from './features/citas/cita-form/cita-form.component';
import { CitasDetailComponent } from './features/citas/cita-detail/cita-detail.component';
import { VitalSignsListComponent } from './features/enfermera-dashboard/vital-signs-list/vital-signs-list.component';
import { VitalSignsFormComponent } from './features/enfermera-dashboard/vital-signs-form/vital-signs-form.component';
import { EnfermeraDashboardComponent } from './features/enfermera-dashboard/enfermera-dashboard.component';
import { EvolucionMedicaComponent } from './features/medico-dashboard/evolucion-medica/evolucion-medica.component';
import { MedicoDashboardComponent } from './features/medico-dashboard/medico-dashboard.component';
import { EvolucionesPacienteComponent } from './features/medico-dashboard/evoluciones-paciente/evoluciones-paciente.component';
import { PacientesMedicoComponent } from './features/medico-dashboard/pacientes-medico/pacientes-medico.component';
import { DashboardPacienteComponent } from './features/dashboard-paciente/dashboard-paciente.component';
import { CitaNewComponent } from './features/citas/cita-new/cita-new.component';
import { RegisterComponent } from './features/register/register.component';
import { LayoutPatientsComponent } from './shared/components/patients/layout-patients/layout-patients.component';
import { ProfilePatientsComponent } from './shared/components/patients/pages/profile-patients/profile-patients.component';
import { PasswordPatientsComponent } from './shared/components/patients/pages/password-patients/password-patients.component';
import { TreatmentsPatientsComponent } from './shared/components/patients/pages/treatments-patients/treatments-patients.component';
import { LabsReportsPatientsComponent } from './shared/components/patients/pages/labs-reports-patients/labs-reports-patients.component';
import { AppointmentsPatientsComponent } from './shared/components/patients/pages/appoiments-patients/appointments-patients.component';
import { LabsReportDetailsComponent } from './shared/components/patients/pages/labs-reports-patients/components/labs-report-details/labs-report-details.component';
import { LabsReportListComponent } from './shared/components/patients/pages/labs-reports-patients/components/labs-report-list/labs-report-list.component';
import { CreateAppointmentsComponent } from './shared/components/patients/pages/appoiments-patients/create-appoiments/create-appointments.component';
import { TreatmentsListComponent } from './shared/components/patients/pages/treatments-patients/treatments-list/treatments-list.component';
import { TreatmentsDetailsComponent } from './shared/components/patients/pages/treatments-patients/treatments-details/treatments-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  // {
  //   path: 'patients',
  //   component: PatientsComponent,
  //   canActivate: [AuthGuard],
  //   data: { roles: ['administrador', 'doctor', 'secretaria'] },
  // },
  {
    path: 'patients/new',
    component: PatientFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['administrador', 'doctor', 'secretaria'] },
  },
  {
    path: 'patients/:id/edit',
    component: PatientFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['administrador', 'doctor', 'secretaria'] },
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminDashboardComponent,
    providers: [provideHttpClient(withInterceptorsFromDi())],
    data: { roles: ['administrador'] },
  },
  {
    path: 'doctor',
    canActivate: [AuthGuard],
    data: { roles: ['doctor'] },
    children: [
      {
        path: '',
        component: MedicoDashboardComponent,
      },
      {
        path: 'evolucion/new',
        component: EvolucionMedicaComponent,
      },
      {
        path: 'evolucion/:id',
        component: EvolucionMedicaComponent,
      },
      {
        path: 'vital-signs/:id',
        component: VitalSignsListComponent,
      },
      {
        path: 'evoluciones-paciente/:id', // Corregido aquí
        component: EvolucionesPacienteComponent,
      },
      {
        path: 'pacientes',
        component: PacientesMedicoComponent,
      },
    ],
  },
  {
    path: 'secretaria',
    component: SecretaryDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['secretaria'] },
    children: [
      // {
      //   path: '',
      //   redirectTo: 'patients',
      //   pathMatch: 'full',
      // },
      {
        path: 'patients',
        children: [
          {
            path: '',
            component: PatientsComponent,
          },
          {
            path: 'new',
            component: PatientFormComponent,
          },
        ],
      },
      {
        path: 'consultorios',
        component: ConsultoriosComponent,
      },
      {
        path: 'citas',
        children: [
          {
            path: '',
            component: CitasListComponent,
          },
          {
            path: 'nueva',
            component: CitaFormComponent,
          },
          {
            path: ':id',
            component: CitasDetailComponent,
          },
          {
            path: ':id/editar',
            component: CitaFormComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'citas',
    // canActivate: [AuthGuard],
    // data: { roles: ['secretaria'] },
    children: [
      {
        path: '',
        component: CitasListComponent,
      },
      {
        path: 'nueva',
        component: CitaNewComponent,
      },
      {
        path: ':id',
        component: CitasDetailComponent,
      },
      {
        path: ':id/editar',
        component: CitaFormComponent,
      },
    ],
  },
  {
    path: 'enfermera',
    canActivate: [AuthGuard],
    data: { roles: ['enfermera'] },
    children: [
      {
        path: '',
        component: EnfermeraDashboardComponent,
      },
      {
        path: 'vital-signs',
        component: VitalSignsListComponent,
      },
      {
        path: 'vital-signs/new',
        component: VitalSignsFormComponent,
      },
      {
        path: 'vital-signs/:id/edit',
        component: VitalSignsFormComponent,
      },
    ],
  },
  // Routes for the patient role
  {
    path: 'patients',
    canActivate: [AuthGuard],
    component: LayoutPatientsComponent,
    data: { roles: ['paciente'] }, //TODO: Adjust roles as needed
    children: [
      {
        path: '',
        component: DashboardPacienteComponent,
      },
      {
        path: 'appointments',
        children: [
          {
            path: '',
            component: AppointmentsPatientsComponent,
          },
          {
            path: 'create',
            component: CreateAppointmentsComponent,
          },
        ],
      },
      {
        path: 'labs-reports',
        children: [
          {
            path: '',
            component: LabsReportsPatientsComponent,
            // component: LabsReportListComponent,
          },
          {
            path: 'details/:id',
            component: LabsReportDetailsComponent,
          },
          {
            path: '**',
            redirectTo: '',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'treatments',
        component: TreatmentsPatientsComponent,
        children: [
          {
            path: '',
            component: TreatmentsListComponent,
          },
          {
            path: 'details/:id',
            component: TreatmentsDetailsComponent,
          },
          {
            path: '**',
            redirectTo: '',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: 'profile',
            component: ProfilePatientsComponent,
          },
          {
            path: 'password',
            component: PasswordPatientsComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
