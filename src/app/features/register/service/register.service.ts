import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Register } from '../../../interfaces/register.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private readonly apiService: ApiService) {}

  register(new_user: Register): Observable<any> {
    return this.apiService.register(new_user);
  }
}
