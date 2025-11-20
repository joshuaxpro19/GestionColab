import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const isAuth = authService.isAuthenticated();
  
  console.log('🛡️ AuthGuard ejecutado');
  console.log('Token existe:', token !== null);
  console.log('Autenticado:', isAuth);
  
  if (isAuth) {
    console.log('✅ Acceso permitido');
    return true;
  } else {
    console.log('❌ Acceso denegado - Redirigiendo a login');
    router.navigate(['/dashboard/login']);
    return false;
  }
};
