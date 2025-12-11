import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styles: `
    .nav-link {
      color: rgba(255, 255, 255, 0.75) !important;
      transition: all 0.3s ease;
      padding: 0.75rem 1rem !important;
      margin-bottom: 0.5rem;
      border-radius: 0.5rem;
      display: block;
      width: 100%;
    }
    .nav-link:hover {
      color: white !important;
      background-color: rgba(255, 255, 255, 0.1);
    }
    .nav-link.active {
      color: white !important;
      background-color: rgba(255, 255, 255, 0.2);
      font-weight: 600;
    }
  `,
})
export class SidebarComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/dashboard/login']);
  }
}
