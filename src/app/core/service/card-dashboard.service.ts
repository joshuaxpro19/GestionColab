import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAreaMetric, ISedeMetric } from '../../features/dashboard.component/interface/IArea';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICollaborador } from '../../features/dashboard.component/interface/Icolaborador';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface DashboardMetricas {
  totalColaboradores: number;
  asistenciasHoy: number;
  totalAreas: number;
  totalSedes: number;
}

@Injectable({
  providedIn: 'root',
})
export class CardDashboardService {
  private apiUrl = `${environment.apiUrl}/api/dashboard`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
  
  // Datos estáticos (Mock Data)
  private mockData: ICardDashboard[] = [
    {
      title: 'Total Colaboradores',
      description: 248,
      footer: 'Actualizado hace 1 hora'
    },
    {
      title: 'Asistencias Hoy',
      description: 234,
      footer: 'Incremento del 5% este mes'
    },
    {
      title: 'Capacitaciones Activas',
      description: 8,
      footer: 'En los últimos 7 días'
    },
    {
      title: 'Evaluaciones Pendientes',
      description: 45,
      footer: 'Deadline próximo: Viernes'
    }
  ];

  getAreaMetrics(): Observable<IAreaMetric[]> {
    
    const data: IAreaMetric[] = [
      { area: 'Desarrollo', count: 45, percentage: 18 },
      { area: 'Operaciones', count: 32, percentage: 13 },
      { area: 'Marketing', count: 24, percentage: 10 },
      { area: 'Finanzas', count: 18, percentage: 7 },
      { area: 'RRHH', count: 12, percentage: 5 },
    ];
    return of(data);
  }

  getSedeMetrics(): Observable<ISedeMetric[]> {

    const data: ISedeMetric[] = [
      { location: 'Lima Principal', count: 150, percentage: 60 },
      { location: 'Piura Norte', count: 65, percentage: 26 },
      { location: 'Arequipa Sur', count: 33, percentage: 14 },
    ];
    return of(data);
  }


  getRecentCollaborators(): Observable<ICollaborador[]> {
    const data: ICollaborador[] = [
      { 
        id: 1, 
        name: 'Carlos Araujo Rojas', 
        dni: '72345678', 
        position: 'Desarrollador Senior', 
        location: 'Lima - Sede Principal', 
        status: 'Activo' 
      },
      { 
        id: 2, 
        name: 'Annie López Martínez', 
        dni: '73456789', 
        position: 'Analista RRHH', 
        location: 'Piura - Sede Norte', 
        status: 'Activo' 
      },
      { 
        id: 3, 
        name: 'Joshua Vilela Calderón', 
        dni: '74567890', 
        position: 'Arquitecto de Software', 
        location: 'Lima - Sede Principal', 
        status: 'Activo' 
      },
    ];
    return of(data);
  }


  


  getCards(): ICardDashboard[] {
    return this.mockData;
  }

  // Métodos conectados al backend
  getMetricas(): Observable<DashboardMetricas> {
    return this.http.get<DashboardMetricas>(`${this.apiUrl}/metricas`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getDistribucionAreas(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/distribucion-areas`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getDistribucionSedes(): Observable<{ [key: string]: any }> {
    return this.http.get<{ [key: string]: any }>(`${this.apiUrl}/distribucion-sedes`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
