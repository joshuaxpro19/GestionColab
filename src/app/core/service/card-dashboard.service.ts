import { Injectable } from '@angular/core';
import { IAreaMetric, ISedeMetric } from '../../features/dashboard.component/interface/IArea';
import { Observable, of } from 'rxjs';
import { ICollaborador } from '../../features/dashboard.component/interface/Icolaborador';

@Injectable({
  providedIn: 'root',
})
export class CardDashboardService {

  constructor() { }
  
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

  getAllCollaborators(): Observable<ICollaborador[]> {
    const data: ICollaborador[] = [
      { 
        id: 1, 
        name: 'Carlos Araujo Rojas', 
        dni: '72345678', 
        phone: '987654321',
        email: 'carlos@empresa.com',
        position: 'Desarrollador Senior', 
        location: 'Lima - Sede Principal', 
        status: 'Activo' 
      },
      { 
        id: 2, 
        name: 'Annie López Martínez', 
        dni: '73456789', 
        phone: '987654322',
        email: 'annie@empresa.com',
        position: 'Analista RRHH', 
        location: 'Piura - Sede Norte', 
        status: 'Activo' 
      },
      { 
        id: 3, 
        name: 'Joshua Vilela Calderón', 
        dni: '74567890', 
        phone: '987654323',
        email: 'joshua@empresa.com',
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
}
