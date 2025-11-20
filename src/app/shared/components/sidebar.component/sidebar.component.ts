import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styles: ``,
})
export class SidebarComponent {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    console.log('🚪 Cerrando sesión...');
    this.authService.logout();
    this.router.navigate(['/dashboard/login']);
  }
}
