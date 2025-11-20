# 🎨 Frontend - Sistema de Gestión de Colaboradores

Frontend desarrollado en **Angular 20** conectado al backend Spring Boot.

## 🚀 Instalación

```bash
cd "c:\Users\Joshua\Documents\PROYECTOS COMPARTIDOS\MDW\Front\GestionColab"
npm install
```

## ▶️ Ejecutar en Desarrollo

```bash
npm start
```

La aplicación estará disponible en: `http://localhost:4200`

---

## 🔌 Servicios Disponibles

### **AuthService** (`src/app/core/service/auth.service.ts`)
Maneja la autenticación JWT.

**Métodos:**
```typescript
login(username: string, password: string): Observable<string>
saveToken(token: string): void
getToken(): string | null
isAuthenticated(): boolean
logout(): void
getAuthHeaders(): HttpHeaders
```

**Ejemplo de uso:**
```typescript
import { AuthService } from './core/service/auth.service';

constructor(private authService: AuthService) {}

login() {
  this.authService.login('admin', '12345').subscribe({
    next: (token) => {
      this.authService.saveToken(token);
      console.log('Login exitoso');
    },
    error: (error) => console.error('Error en login', error)
  });
}
```

---

### **ColaboradorService** (`src/app/core/service/colaborador.service.ts`)
Maneja el CRUD de colaboradores.

**Métodos:**
```typescript
listarTodos(): Observable<Colaborador[]>
obtenerPorId(id: number): Observable<Colaborador>
obtenerPorDni(dni: string): Observable<Colaborador>
listarActivos(): Observable<Colaborador[]>
crear(colaborador: Colaborador): Observable<Colaborador>
actualizar(id: number, colaborador: Colaborador): Observable<Colaborador>
eliminar(id: number): Observable<void>
```

**Ejemplo de uso:**
```typescript
import { ColaboradorService } from './core/service/colaborador.service';

constructor(private colaboradorService: ColaboradorService) {}

ngOnInit() {
  this.colaboradorService.listarTodos().subscribe({
    next: (colaboradores) => {
      console.log('Colaboradores:', colaboradores);
      this.colaboradores = colaboradores;
    },
    error: (error) => console.error('Error', error)
  });
}

crearColaborador() {
  const nuevoColaborador = {
    nombre: 'Joshua',
    apellido: 'Yllpa',
    dni: '72345678',
    telefono: '987654321',
    email: 'joshua@empresa.com',
    fechaIngreso: '2024-11-19',
    puesto: { id: 1 },
    sede: { id: 1 }
  };

  this.colaboradorService.crear(nuevoColaborador).subscribe({
    next: (creado) => console.log('Colaborador creado:', creado),
    error: (error) => console.error('Error:', error)
  });
}
```

---

### **SedeService** (`src/app/core/service/sede.service.ts`)
Maneja el CRUD de sedes.

**Métodos:**
```typescript
listarTodas(): Observable<Sede[]>
obtenerPorId(id: number): Observable<Sede>
crear(sede: Sede): Observable<Sede>
actualizar(id: number, sede: Sede): Observable<Sede>
eliminar(id: number): Observable<void>
```

---

### **AreaService** (`src/app/core/service/area.service.ts`)
Maneja el CRUD de áreas.

**Métodos:**
```typescript
listarTodas(): Observable<Area[]>
obtenerPorId(id: number): Observable<Area>
crear(area: Area): Observable<Area>
actualizar(id: number, area: Area): Observable<Area>
eliminar(id: number): Observable<void>
```

---

### **PuestoService** (`src/app/core/service/puesto.service.ts`)
Maneja el CRUD de puestos.

**Métodos:**
```typescript
listarTodos(): Observable<Puesto[]>
listarPorArea(areaId: number): Observable<Puesto[]>
obtenerPorId(id: number): Observable<Puesto>
crear(puesto: Puesto): Observable<Puesto>
actualizar(id: number, puesto: Puesto): Observable<Puesto>
eliminar(id: number): Observable<void>
```

---

### **CardDashboardService** (`src/app/core/service/card-dashboard.service.ts`)
Maneja las métricas del dashboard.

**Métodos:**
```typescript
getMetricas(): Observable<DashboardMetricas>
getDistribucionAreas(): Observable<{ [key: string]: number }>
getDistribucionSedes(): Observable<{ [key: string]: any }>
// También tiene métodos mock para desarrollo
getCards(): ICardDashboard[]
getAreaMetrics(): Observable<IAreaMetric[]>
getSedeMetrics(): Observable<ISedeMetric[]>
getRecentCollaborators(): Observable<ICollaborador[]>
```

**Ejemplo de uso:**
```typescript
import { CardDashboardService } from './core/service/card-dashboard.service';

constructor(private dashboardService: CardDashboardService) {}

ngOnInit() {
  // Obtener métricas del backend
  this.dashboardService.getMetricas().subscribe({
    next: (metricas) => {
      console.log('Total colaboradores:', metricas.totalColaboradores);
      console.log('Asistencias hoy:', metricas.asistenciasHoy);
    }
  });

  // Obtener distribución por áreas
  this.dashboardService.getDistribucionAreas().subscribe({
    next: (distribucion) => {
      console.log('Distribución por áreas:', distribucion);
    }
  });
}
```

---

## 🔧 Configuración del Backend

La URL del backend se configura en:

**Desarrollo:** `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

**Producción:** `src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend-produccion.com'
};
```

---

## 🔐 Flujo de Autenticación

1. **Login:**
```typescript
this.authService.login('admin', '12345').subscribe({
  next: (token) => {
    this.authService.saveToken(token);
    // Redirigir al dashboard
    this.router.navigate(['/dashboard']);
  }
});
```

2. **Proteger rutas:** Todos los servicios ya incluyen automáticamente el token JWT en los headers.

3. **Logout:**
```typescript
this.authService.logout();
this.router.navigate(['/login']);
```

---

## 📦 Interfaces TypeScript

### **Colaborador**
```typescript
interface Colaborador {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  fechaIngreso: string; // Formato: "YYYY-MM-DD"
  estado?: string; // "Activo" o "Inactivo"
  urlFoto?: string;
  puesto?: { id: number; nombre?: string };
  sede?: { id: number; nombreSede?: string };
}
```

### **Sede**
```typescript
interface Sede {
  id?: number;
  nombreSede: string;
  ciudad: string;
  pais: string;
  direccion: string;
}
```

### **Area**
```typescript
interface Area {
  id?: number;
  nombre: string;
  descripcion?: string;
  icono?: string;
  color?: string;
}
```

### **Puesto**
```typescript
interface Puesto {
  id?: number;
  nombre: string;
  descripcion?: string;
  area?: { id: number; nombre?: string };
}
```

---

## 🛠️ Tareas Pendientes

- [ ] Crear componente de login
- [ ] Implementar guard de autenticación para rutas protegidas
- [ ] Conectar el dashboard con los servicios reales del backend
- [ ] Crear formularios para CRUD de colaboradores
- [ ] Crear formularios para CRUD de sedes
- [ ] Implementar manejo de errores global (interceptor)
- [ ] Agregar loading spinner durante peticiones HTTP

---

## 📝 Notas Importantes

1. **Todos los servicios ya están configurados** y listos para usar
2. El **HttpClientModule** ya está importado en el `AppModule`
3. Los **tokens JWT se guardan automáticamente** en `localStorage`
4. Todas las peticiones a `/api/**` incluyen automáticamente el token en los headers
5. El backend debe estar ejecutándose en `http://localhost:8080`

---

## 🐛 Solución de Problemas

### Error: CORS
Si ves errores de CORS, verifica que el backend esté ejecutándose y tenga CORS habilitado.

### Error: 401 Unauthorized
El token JWT expiró o es inválido. Vuelve a hacer login.

### Error: Cannot find module
Ejecuta: `npm install`

---

## 📚 Documentación Adicional

- **Documentación de la API Backend:** Ver `API_DOCUMENTATION.md` en el proyecto Spring Boot
- **Angular Docs:** https://angular.dev/

---

¡Listo para empezar a desarrollar! 🚀
