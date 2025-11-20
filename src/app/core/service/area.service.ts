import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Area {
  id?: number;
  nombre: string;
  descripcion?: string;
  icono?: string;
  color?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = `${environment.apiUrl}/api/areas`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  listarTodas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  obtenerPorId(id: number): Observable<Area> {
    return this.http.get<Area>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  crear(area: Area): Observable<Area> {
    return this.http.post<Area>(this.apiUrl, area, {
      headers: this.authService.getAuthHeaders()
    });
  }

  actualizar(id: number, area: Area): Observable<Area> {
    return this.http.put<Area>(`${this.apiUrl}/${id}`, area, {
      headers: this.authService.getAuthHeaders()
    });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
