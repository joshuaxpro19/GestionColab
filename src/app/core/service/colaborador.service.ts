import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Colaborador {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  fechaIngreso: string;
  estado?: string;
  urlFoto?: string;
  puesto?: { id: number; nombre?: string };
  sede?: { id: number; nombreSede?: string };
}

export interface ColaboradorConHistorial {
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  email: string;
  fechaIngreso: string;
  estado?: string;
  puestoId?: number;
  sedeId?: number;
  salario?: number;
  modalidadId?: number;
  responsabilidades?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {
  private apiUrl = `${environment.apiUrl}/api/colaboradores`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  listarTodos(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  obtenerPorId(id: number): Observable<Colaborador> {
    return this.http.get<Colaborador>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  obtenerPorDni(dni: string): Observable<Colaborador> {
    return this.http.get<Colaborador>(`${this.apiUrl}/dni/${dni}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  listarActivos(): Observable<Colaborador[]> {
    return this.http.get<Colaborador[]>(`${this.apiUrl}/activos`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  crear(colaborador: Colaborador): Observable<Colaborador> {
    return this.http.post<Colaborador>(this.apiUrl, colaborador, {
      headers: this.authService.getAuthHeaders()
    });
  }

  crearConHistorial(colaborador: ColaboradorConHistorial): Observable<Colaborador> {
    return this.http.post<Colaborador>(`${this.apiUrl}/con-historial`, colaborador, {
      headers: this.authService.getAuthHeaders()
    });
  }

  actualizar(id: number, colaborador: Colaborador): Observable<Colaborador> {
    return this.http.put<Colaborador>(`${this.apiUrl}/${id}`, colaborador, {
      headers: this.authService.getAuthHeaders()
    });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
