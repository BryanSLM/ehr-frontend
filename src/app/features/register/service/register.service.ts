import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private apiService: ApiService) {}

  register(new_user: any) {
    return this.apiService.register(user);
  }
}
