# 🔗 Guía de Integración: Conectar Frontend con Backend

## ✅ Cambios Aplicados

He modificado los componentes para que **carguen datos reales del backend** además de mantener los datos mock como fallback.

---

## 📝 Qué se modificó:

### **1. DashboardComponent** ✅
- Ahora llama a `getMetricas()` del backend
- Actualiza las cards con datos reales
- Carga distribución de áreas desde `/api/dashboard/distribucion-areas`
- Carga distribución de sedes desde `/api/dashboard/distribucion-sedes`

### **2. ColaboradoresComponent** ✅
- Llama a `listarTodos()` del backend
- Muestra colaboradores reales en la tabla
- El formulario ahora guarda en el backend con `crear()`
- Recarga automáticamente la lista después de crear

---

## 🚨 **IMPORTANTE: Falta implementar Login**

Para que funcione correctamente, **necesitas agregar un componente de Login** que:

1. Solicite username y password
2. Llame a `authService.login()`
3. Guarde el token en localStorage
4. Redirija al dashboard

---

## 🔐 Ejemplo de Componente Login

Crea: `src/app/features/login/login.component.ts`

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div>
          <label>Usuario:</label>
          <input type="text" formControlName="username" />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" formControlName="password" />
        </div>
        <button type="submit" [disabled]="!loginForm.valid">
          Iniciar Sesión
        </button>
        <div *ngIf="errorMessage" class="error">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 100px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }
    .error {
      color: red;
      margin-top: 10px;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['admin', Validators.required],
      password: ['12345', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      
      this.authService.login(username, password).subscribe({
        next: (token) => {
          console.log('✅ Login exitoso');
          this.authService.saveToken(token);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('❌ Error en login:', error);
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      });
    }
  }
}
```

---

## 🛣️ Configurar Rutas

En `app-routing-module.ts`:

```typescript
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'colaboradores', component: ColaboradoresComponent },
  // ... otras rutas
];
```

---

## 🔒 Crear Guard de Autenticación

Crea: `src/app/core/guards/auth.guard.ts`

```typescript
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
```

**Proteger rutas:**

```typescript
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]  // 👈 Protegida
  },
  { 
    path: 'colaboradores', 
    component: ColaboradoresComponent,
    canActivate: [AuthGuard]  // 👈 Protegida
  }
];
```

---

## 🧪 Cómo Probar

### **1. Sin Login (verás errores en consola):**
- Abre `http://localhost:4200`
- Abre la consola del navegador (F12)
- Verás: `❌ Error al cargar métricas: 401 Unauthorized`
- **Esto es normal**, necesitas hacer login primero

### **2. Probar Login manualmente desde la consola:**

```javascript
// En la consola del navegador
fetch('http://localhost:8080/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: '12345' })
})
.then(res => res.text())
.then(token => {
  localStorage.setItem('token', token);
  console.log('✅ Token guardado, recarga la página');
  location.reload();
});
```

### **3. Con Login implementado:**
- Ir a `http://localhost:4200/login`
- Ingresar: `admin` / `12345`
- Debe redirigir al dashboard
- Las cards mostrarán datos reales
- La tabla de colaboradores mostrará datos del backend

---

## 📊 Qué verás después de hacer login:

### **Dashboard:**
- ✅ Cards actualizadas con datos reales del backend
- ✅ Distribución por áreas desde la BD
- ✅ Distribución por sedes desde la BD
- ✅ Mensajes en consola: `✅ Métricas del backend:`

### **Colaboradores:**
- ✅ Tabla con colaboradores de la BD
- ✅ Formulario funcional que guarda en el backend
- ✅ Recarga automática después de crear

---

## 🔍 Verificar en la Consola del Navegador

Deberías ver:
```
✅ Token recibido: eyJhbGciOiJIUzI1NiJ9...
✅ Métricas del backend: {totalColaboradores: 11, asistenciasHoy: 8, ...}
✅ Distribución por áreas: {Desarrollo: 4, RRHH: 2, ...}
✅ Colaboradores del backend: [Array de 11]
```

Si ves errores 401:
```
❌ Error al cargar métricas: 401 Unauthorized
ℹ️ Asegúrate de hacer login primero
```

---

## ✅ Checklist Final

- [ ] Crear componente de Login
- [ ] Configurar rutas con guard
- [ ] Insertar datos de prueba en la BD (`datos_prueba.sql`)
- [ ] Iniciar backend: `.\mvnw.cmd spring-boot:run`
- [ ] Iniciar frontend: `npm start`
- [ ] Hacer login con `admin`/`12345`
- [ ] Verificar que las cards muestran datos reales
- [ ] Verificar que la tabla de colaboradores carga datos de la BD
- [ ] Probar crear un colaborador desde el formulario

---

## 🎯 Resumen

**Los componentes ya están conectados al backend**, pero necesitan que:
1. El usuario haga login primero
2. El token JWT esté guardado en localStorage
3. Los datos de prueba estén en la base de datos

Una vez implementes el login, **todo funcionará automáticamente** 🚀
