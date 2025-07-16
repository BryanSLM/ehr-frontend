import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Register } from '../../interfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(user: Register): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/register`, user);
  }

  login(credentials: any) {
    return this.http.post(`${this.apiUrl}/users/login`, credentials);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/me`);
  }
}
