import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Puesto {
  id?: number;
  nombre: string;
  descripcion?: string;
  area?: { id: number; nombre?: string };
}

@Injectable({
  providedIn: 'root'
})
export class PuestoService {
  private apiUrl = `${environment.apiUrl}/api/puestos`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  listarTodos(): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  listarPorArea(areaId: number): Observable<Puesto[]> {
    return this.http.get<Puesto[]>(`${this.apiUrl}/area/${areaId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  obtenerPorId(id: number): Observable<Puesto> {
    return this.http.get<Puesto>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  crear(puesto: Puesto): Observable<Puesto> {
    return this.http.post<Puesto>(this.apiUrl, puesto, {
      headers: this.authService.getAuthHeaders()
    });
  }

  actualizar(id: number, puesto: Puesto): Observable<Puesto> {
    return this.http.put<Puesto>(`${this.apiUrl}/${id}`, puesto, {
      headers: this.authService.getAuthHeaders()
    });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
