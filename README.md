# Gestion de Colaboradores - Proyecto Full Stack

## Descripción General

**Gestion de Colaboradores** es una aplicación full-stack diseñada para gestionar información de colaboradores en una organización. El sistema permite administrar:

-  Colaboradores y sus datos personales
-  Sedes/ubicaciones de trabajo
-  Puestos laborales
-  Áreas departamentales
-  Modalidades de trabajo
-  Dashboard con información general
-  Historial de cambios
-  Autenticación y seguridad

---

## Arquitectura del Proyecto

```
MDW/
├── Back/                    # API REST (Spring Boot)
│   └── marcosDesarrolloWeb/
└── Front/                   # Aplicación Web (Angular)
    └── GestionColab/
```

---

## BACKEND - Spring Boot (Java)

### Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|-----------|---------|-------------|
| **Java** | 17 | Lenguaje de programación |
| **Spring Boot** | 3.5.6 | Framework principal |
| **Spring Data JPA** | Latest | ORM para acceso a datos |
| **Spring Security** | Latest | Autenticación y autorización |
| **Spring Web** | Latest | REST API |
| **MySQL** | (Local) | Base de datos relacional |
| **JWT (JJWT)** | 0.11.5 | Tokens de autenticación |
| **Lombok** | Latest | Reducción de boilerplate |
| **Maven** | 3.x | Gestor de dependencias y build |

### Estructura de Carpetas

```
marcosDesarrolloWeb/
├── src/main/java/com/gestioncol/demo/
│   ├── DemoApplication.java          # Clase principal
│   ├── config/                       # Configuración
│   │   ├── CorsConfig.java           # CORS para Frontend
│   │   └── SecurityConfig.java       # Seguridad y JWT
│   ├── controller/                   # REST Controllers
│   │   ├── AreaController.java
│   │   ├── AuthController.java       # Login/Registro
│   │   ├── ColaboradorController.java
│   │   ├── DashboardController.java
│   │   ├── HistorialController.java
│   │   ├── ModalidadController.java
│   │   ├── PuestoController.java
│   │   └── SedeController.java
│   ├── model/                        # Entidades JPA
│   │   ├── Area.java
│   │   ├── Colaborador.java
│   │   ├── Puesto.java
│   │   ├── Sede.java
│   │   └── ... (más modelos)
│   ├── repository/                   # Spring Data Repositories
│   │   ├── AreaRepository.java
│   │   ├── ColaboradorRepository.java
│   │   └── ... (más repos)
│   ├── services/                     # Lógica de negocio
│   │   └── imp/                      # Implementaciones
│   └── security/                     # JWT y autenticación
├── src/main/resources/
│   ├── application.properties        # Configuración de BD y app
│   ├── static/                       # Archivos estáticos
│   └── templates/                    # Vistas (si aplica)
├── pom.xml                           # Dependencias Maven
├── Dockerfile                        # Containerización
└── mvnw / mvnw.cmd                   # Maven Wrapper
```

###  Base de Datos

- **Motor**: MySQL
- **Nombre BD por defecto**: `db_gestion_colaboradores`
- **Usuario**: `root`
- **Contraseña**: `123456`
- **Puerto**: `3306`

**Scripts SQL proporcionados:**
- `datos_prueba.sql` - Datos iniciales para pruebas
- `insertar_historial.sql` - Datos de historial

###  Requisitos Previos (Backend)

-  **Java 17** o superior
-  **MySQL 5.7** o superior (ejecutándose en `localhost:3306`)
-  **Maven 3.6+** (incluido Maven Wrapper)
-  Credenciales de MySQL configuradas

###  Instalación y Ejecución

####  **Configurar Base de Datos**
```bash
# Crear base de datos
mysql -u root -p123456 < datos_prueba.sql
mysql -u root -p123456 < insertar_historial.sql
```

####  **Configurar Propiedades (esto es opcional)**
Si tu MySQL está en otro puerto/usuario, edita:
```
src/main/resources/application.properties
```

Parámetros clave:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/db_gestion_colaboradores
spring.datasource.username=root
spring.datasource.password=123456
spring.jpa.hibernate.ddl-auto=update
```

####  **Compilar e Instalar Dependencias**
```bash
cd Back/marcosDesarrolloWeb

# Con Maven Wrapper (Windows)
mvnw.cmd clean install

# O con Maven instalado globalmente
maven clean install
```

#### **Ejecutar la Aplicación**
```bash
# Con Maven Wrapper
mvnw.cmd spring-boot:run

# O ejecutar el JAR generado
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

**La API estará disponible en**: `http://localhost:8080`

#### **Endpoints Principales**

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Obtener JWT token |
| POST | `/api/auth/register` | Registrar nuevo usuario |
| GET | `/api/colaboradores` | Listar colaboradores |
| POST | `/api/colaboradores` | Crear colaborador |
| GET | `/api/areas` | Listar áreas |
| GET | `/api/puestos` | Listar puestos |
| GET | `/api/sedes` | Listar sedes |
| GET | `/api/dashboard` | Datos del dashboard |

---

## FRONTEND - Angular

### Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|-----------|---------|-------------|
| **Angular** | 20.3.x | Framework principal |
| **TypeScript** | 5.x+ | Lenguaje de tipado |
| **RxJS** | ~7.8.0 | Programación reactiva |
| **Angular Forms** | 20.3.x | Formularios reactivos |
| **Angular Router** | 20.3.x | Navegación |
| **Angular SSR** | 20.3.7 | Server-Side Rendering |
| **Express.js** | 5.1.0 | Servidor para SSR |
| **Node.js** | 18+ | Runtime |
| **npm** | 9+ | Gestor de paquetes |

### Estructura de Carpetas

```
GestionColab/
├── src/
│   ├── index.html                    # Página HTML principal
│   ├── main.ts                       # Punto de entrada cliente
│   ├── main.server.ts                # Punto de entrada SSR
│   ├── server.ts                     # Configuración servidor Express
│   ├── styles.css                    # Estilos globales
│   │
│   └── app/
│       ├── app.ts                    # Componente raíz
│       ├── app-routing-module.ts     # Rutas principales
│       ├── app.module.server.ts      # Módulo SSR
│       │
│       ├── core/                     # Servicios y guards
│       │   ├── core-module.ts
│       │   ├── guards/
│       │   │   └── auth.guard.ts     # Guard de autenticación
│       │   └── service/
│       │       ├── auth.service.ts   # Autenticación
│       │       ├── colaborador.service.ts
│       │       ├── area.service.ts
│       │       ├── puesto.service.ts
│       │       ├── sede.service.ts
│       │       ├── modalidad.service.ts
│       │       ├── historial.service.ts
│       │       └── card-dashboard.service.ts
│       │
│       ├── features/                 # Módulos de características
│       │   ├── features-routing-module.ts
│       │   ├── login.component/      # Página de login
│       │   ├── dashboard.component/  # Dashboard principal
│       │   │   ├── dashboard.component.ts
│       │   │   ├── dashboard.component.html
│       │   │   └── interface/
│       │   │       └── IArea.ts
│       │   │       └── Icolaborador.ts
│       │   ├── layout.component/     # Layout principal
│       │   ├── colaboradores.component/ # Gestión colaboradores
│       │   ├── areas.component/      # Gestión áreas
│       │   ├── puestos.component/    # Gestión puestos
│       │   ├── sedes.component/      # Gestión sedes
│       │   └── historial.component/  # Historial
│       │
│       └── shared/                   # Componentes compartidos
│           ├── shared-module.ts
│           ├── components/
│           │   └── sidebar.component/
│           └── interfaces/
│               └── IcardDashboard.ts
│
├── environments/
│   ├── environment.ts                # Config desarrollo
│   └── environment.prod.ts           # Config producción
│
├── angular.json                      # Config Angular CLI
├── package.json                      # Dependencias npm
├── tsconfig.json                     # Config TypeScript
└── Dockerfile                        # Containerización
```

### Requisitos Previos (Frontend)

-  **Node.js 18+**
-  **npm 9+** (incluido con Node.js)
-  **Angular CLI 20.3.7+** (opcional, puede usar `npx`)
-  Backend ejecutándose en `http://localhost:8080`

###  Instalación y Ejecución

#### 1️ **Instalar Dependencias**
```bash
cd Front/GestionColab
npm install
```

#### 2️ **Configurar URL del Backend**
Edita el archivo de configuración según el entorno:

**Para desarrollo** - `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

**Para producción** - `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend.com'  // Cambiar URL
};
```

#### 3️ **Ejecutar en Modo Desarrollo**
```bash
# Opción 1: Usar npm directamente
npm start

# Opción 2: Usar Angular CLI
ng serve

# Con puerto personalizado
ng serve --port 4200
```

**La aplicación estará disponible en**: `http://localhost:4200`

#### 4️ **Compilar para Producción**
```bash
# Build estándar
npm run build

# O con Angular CLI
ng build

# Con optimizaciones
ng build --configuration production
```

#### 5️ **Ejecutar con Server-Side Rendering (SSR)**
```bash
# Compilar con SSR
ng build

# Ejecutar servidor SSR
npm run serve:ssr:GestionColab
```

#### 6️ **Rutas Principales de la Aplicación**

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/login` | LoginComponent | Autenticación |
| `/dashboard` | DashboardComponent | Panel principal |
| `/colaboradores` | ColaboradoresComponent | Gestión colaboradores |
| `/areas` | AreasComponent | Gestión áreas |
| `/puestos` | PuestosComponent | Gestión puestos |
| `/sedes` | SedesComponent | Gestión sedes |
| `/historial` | HistorialComponent | Historial de cambios |

---

## Integración Backend - Frontend

### Configuración CORS
El backend está configurado en `CorsConfig.java` para permitir solicitudes desde:
- `http://localhost:4200` (desarrollo)
- Otros orígenes pueden configurarse según necesidad

### Autenticación
1. **Login**: El usuario se autentica en `/api/auth/login`
2. **Token JWT**: Se retorna un token JWT
3. **Headers**: Se incluye `Authorization: Bearer {token}` en cada solicitud
4. **Guard**: `auth.guard.ts` protege las rutas

---

## Docker

### Compilar Imágenes

**Backend:**
```bash
cd Back/marcosDesarrolloWeb
docker build -t gestioncol-backend:latest .
docker run -p 8080:8080 --network host gestioncol-backend:latest
```

**Frontend:**
```bash
cd Front/GestionColab
docker build -t gestioncol-frontend:latest .
docker run -p 80:4200 gestioncol-frontend:latest
```

---

##  Variables de Entorno

### Backend (`application.properties`)
```properties
# Base de Datos
spring.datasource.url=jdbc:mysql://localhost:3306/db_gestion_colaboradores
spring.datasource.username=root
spring.datasource.password=123456

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Puerto (por defecto 8080)
server.port=8080
```

### Frontend (`environment.ts`)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

---

##  Comandos Útiles

### Backend
```bash
# Compilar
mvnw.cmd clean compile

# Empaquetar
mvnw.cmd clean package

# Limpiar build
mvnw.cmd clean

# Ejecutar tests
mvnw.cmd test

# Ejecutar aplicación
mvnw.cmd spring-boot:run
```

### Frontend
```bash
# Instalar dependencias
npm install

# Ejecutar desarrollo
npm start

# Compilar para producción
npm run build

# Linter (si está configurado)
ng lint

# Tests (si está configurado)
ng test

# Build SSR
ng build && npm run serve:ssr:GestionColab
```

---

## Flujo de Inicio Completo

### 1️ **Iniciar MySQL**
```bash
# Windows (si MySQL está instalado como servicio)
net start MySQL80

# O ejecutar directamente si tienes instalado MySQL
```

### 2️ **Crear Base de Datos**
```bash
mysql -u root -p123456 < datos_prueba.sql
```

### 3️ **Ejecutar Backend**
```bash
cd Back/marcosDesarrolloWeb
mvnw.cmd spring-boot:run
# Esperar a que diga "Started DemoApplication in X seconds"
```

### 4️ **En otra terminal, ejecutar Frontend**
```bash
cd Front/GestionColab
npm install  # Solo la primera vez
npm start
# La app se abrirá en http://localhost:4200
```

### 5️ **Acceder a la Aplicación**
- URL: `http://localhost:4200`
- Credenciales: Dependerá de los datos en tu BD

---

## Troubleshooting

### Backend no inicia
-  Verifica que MySQL esté ejecutándose
-  Confirma las credenciales en `application.properties`
-  Revisa que el puerto 8080 esté disponible

### Frontend no se conecta al Backend
-  Verifica que el backend esté ejecutándose en puerto 8080
-  Comprueba la URL en `environment.ts`
-  Revisa la consola del navegador para errores CORS

### Error de base de datos
-  Asegúrate que MySQL está corriendo
-  Verifica los scripts SQL se ejecutaron correctamente
-  Comprueba permisos del usuario `root`

---

##  Documentación Adicional

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Angular Docs](https://angular.io/docs)
- [MySQL Docs](https://dev.mysql.com/doc/)
- [JWT en Spring Security](https://jwt.io/)

---

##  Licencia

Proyecto desarrollado para GestionCol

---
