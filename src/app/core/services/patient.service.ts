import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = `${environment.apiUrl}/patients`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage?.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  getPatients(params: any): Observable<any> {
    return this.http.get(this.apiUrl, { params });
  }

  getPatientById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createPatient(patient: any): Observable<any> {
    return this.http.post(this.apiUrl, patient);
  }

  updatePatient(id: string, patient: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, patient);
  }

  deletePatient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProvincias(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/ubicacion/provincias`);
  }

  getCantones(provinciaId: number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/api/ubicacion/cantones/${provinciaId}`,
    );
  }

  getParroquias(cantonId: number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/api/ubicacion/parroquias/${cantonId}`,
    );
  }

  getPatientByIdentification(
    typeIdentification: string,
    identification: string,
  ) {
    return this.http.get(
      `${this.apiUrl}/${typeIdentification}/${identification}`,
    );
  }

  createPatientExternal(body: any) {
    return this.http.post(`${this.apiUrl}/external/create-patient`, body);
  }

  getScheduleAvailable(specialty: string, date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/consultorios/${specialty}/${date}`);
  }

  createAppointment(appointment: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/external/create-appointment`,
      appointment,
    );
  }

  getAppointmentByIdentification(): Observable<any> {
    const user = JSON.parse(localStorage?.getItem('user') || '{}');
    console.log('User from localStorage:', user);
    if (!user) {
      throw new Error('User not found in localStorage');
    }
    return this.http.get(`${this.apiUrl}/appointments/${user.identification}`, {
      headers: this.getHeaders(),
    });
  }

  changePassword(body: { currentPassword: string; newPassword: string }) {
    const user = JSON.parse(localStorage?.getItem('user') || '{}');
    if (!user) {
      throw new Error('User not found in localStorage');
    }
    return this.http.put(
      `${this.apiUrl}/change-password/${user.identification}`,
      body,
      {
        headers: this.getHeaders(),
      },
    );
  }
}
