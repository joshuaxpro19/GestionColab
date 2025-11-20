import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isAuthenticated();
  
  if (isAuth) {
    return true;
  } else {
    router.navigate(['/dashboard/login']);
    return false;
  }
};
