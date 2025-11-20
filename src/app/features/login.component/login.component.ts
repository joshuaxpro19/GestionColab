import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor complete todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: (token) => {
        console.log('✅ Login exitoso, token recibido');
        console.log('Token (primeros 30 chars):', token.substring(0, 30) + '...');
        this.authService.saveToken(token);
        
        // Verificar que el token se guardó
        const tokenGuardado = this.authService.getToken();
        console.log('Verificación: ¿Token guardado?', tokenGuardado !== null);
        
        console.log('Navegando a /dashboard');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('❌ Error en login:', error);
        this.isLoading = false;
        if (error.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        } else {
          this.errorMessage = 'Error al conectar con el servidor';
        }
      }
    });
  }
}
