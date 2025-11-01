import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

// Interfaces para tipar las respuestas
interface User {
  id: number;
  username: string;
  roles: string[];
  active: boolean;
  identificacion: string;
  tipo_identificacion: 'cedula' | 'pasaporte' | 'no_identificado';
}

interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'token';
  private userKey = 'user';
  private showRoleSelection = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  setActiveRole(role: string): void {
    const user = this.getUser();
    if (user) {
      localStorage.setItem('activeRole', role);
    }
  }

  getActiveRole(): string | null {
    return localStorage.getItem('activeRole');
  }

  getUserRoles(): string[] {
    const user = this.getUser();
    return user?.roles || [];
  }


  login(identificacion: string, password: string, selectedRole: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/auth/login`, {
      identificacion,
      password,
      selectedRole
    }).pipe(
      tap(response => {
        if (response.token) {
          this.setSession(response);
        }
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => error);
      })
    );
  }

  redirectToRoleDashboard(role: string): void {
    switch(role.toLowerCase()) {
      case 'administrador':
        this.router.navigate(['/admin']);
        break;
      case 'doctor':
      case 'dentista':
        this.router.navigate(['/doctor']);
        break;
      case 'secretaria':
        this.router.navigate(['/secretaria']);
        break;
      case 'enfermera':
        this.router.navigate(['/enfermera']);
        break;
      default:
        this.router.navigate(['/unauthorized']);
    }
  }

  private setSession(response: LoginResponse): void {
    localStorage.setItem(this.tokenKey, response.token);
    localStorage.setItem(this.userKey, JSON.stringify(response.user));
    
    // Establecer el primer rol como rol activo si el usuario tiene roles
    if (response.user.roles && response.user.roles.length > 0) {
      this.setActiveRole(response.user.roles[0]);
    }
  }
  

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    console.log('Token actual:', token);
    return token;
  }

  getUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr) as User;
      } catch {
        return null;
      }
    }
    return null;
  }


  isSecretary(): boolean {
    const user = this.getUser();
    return user?.roles?.includes('secretaria') || false;
  }


  // Devuelve el rol activo seleccionado por el usuario
  getUserRole(): string {
    return this.getActiveRole() || '';
  }

  // Verifica si el rol activo es el requerido
  hasActiveRole(requiredRole: string): boolean {
    const activeRole = this.getActiveRole();
    return activeRole ? activeRole.toLowerCase() === requiredRole.toLowerCase() : false;
  }

  hasRole(requiredRole: string): boolean {
    const userRoles = this.getUserRoles();
    return userRoles.some(role => role.toLowerCase() === requiredRole.toLowerCase());
  }
  isUserActive(): boolean {
    const user = this.getUser();
    return user ? user.active : false;
  }

  forgotPassword(email: string): Observable<any> {
    console.log('Enviando solicitud de recuperación para:', { email });
    
    return this.http.post(`${this.apiUrl}/api/auth/forgot-password`, { 
      email 
    }).pipe(
      tap(response => {
        console.log('Respuesta de forgot password:', response);
      }),
      catchError(error => {
        console.error('Error en forgot password:', error);
        return throwError(() => error);
      })
    );
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    console.log('Enviando reset password con token');
    
    return this.http.post(`${this.apiUrl}/api/auth/reset-password`, {
        token,
        newPassword  // Mantener como newPassword para coincidir con el backend
    }).pipe(
        tap(response => {
            console.log('Respuesta del servidor reset password:', response);
        }),
        catchError(error => {
            console.error('Error en reset password:', error);
            return throwError(() => error);
        })
    );
}

}

