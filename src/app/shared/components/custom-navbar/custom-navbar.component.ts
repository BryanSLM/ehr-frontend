import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-navbar',
  standalone: true,
  imports: [],
  templateUrl: './custom-navbar.component.html',
  styleUrl: './custom-navbar.component.css',
})
export class CustomNavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
