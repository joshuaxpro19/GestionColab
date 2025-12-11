import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface HistorialLaboral {
  id?: number;
  fechaInicio: string;
  fechaFin?: string;
  salario: number;
  responsabilidades?: string;
  estadoPuesto: string;
  colaborador?: {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
  };
  puesto?: {
    id: number;
    nombre: string;
    area?: {
      id: number;
      nombre: string;
      color?: string;
    };
  };
  area?: {
    id: number;
    nombre: string;
    color?: string;
  };
  modalidad?: {
    id: number;
    title: string;
    descipcion?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  private apiUrl = `${environment.apiUrl}/api/historial`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Listar todo el historial
  listarTodos(): Observable<HistorialLaboral[]> {
    return this.http.get<HistorialLaboral[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Obtener historial de un colaborador específico
  obtenerPorColaborador(colaboradorId: number): Observable<HistorialLaboral[]> {
    return this.http.get<HistorialLaboral[]>(`${this.apiUrl}/colaborador/${colaboradorId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Obtener un registro por ID
  obtenerPorId(id: number): Observable<HistorialLaboral> {
    return this.http.get<HistorialLaboral>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Filtrar por estado
  obtenerPorEstado(estado: string): Observable<HistorialLaboral[]> {
    return this.http.get<HistorialLaboral[]>(`${this.apiUrl}/estado/${estado}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Crear nuevo registro
  crear(historial: HistorialLaboral): Observable<HistorialLaboral> {
    return this.http.post<HistorialLaboral>(this.apiUrl, historial, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Actualizar registro
  actualizar(id: number, historial: HistorialLaboral): Observable<HistorialLaboral> {
    return this.http.put<HistorialLaboral>(`${this.apiUrl}/${id}`, historial, {
      headers: this.authService.getAuthHeaders()
    });
  }

  // Eliminar registro
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
