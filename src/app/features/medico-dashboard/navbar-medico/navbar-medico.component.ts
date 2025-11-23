import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar-medico',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar-medico.component.html',
  styleUrls: ['./navbar-medico.component.css']
})
export class NavbarMedicoComponent {
 constructor(private router: Router) {}

  cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

ngOnInit() {
    
    this.enableAutoCloseOnLinkClick(); // 👈 activa el cierre automático del menú hamburguesa
  }

  enableAutoCloseOnLinkClick() {
  const navbarCollapse = document.getElementById('navbarMenu');
  if (!navbarCollapse) return;

  const navItems = document.querySelectorAll('.nav-link, .btn-cerrar-sesion');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const collapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse);
      collapse.hide();
    });
  });
}


}
