import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Sede {
  id?: number;
  nombreSede: string;
  ciudad: string;
  pais: string;
  direccion: string;
}

@Injectable({
  providedIn: 'root'
})
export class SedeService {
  private apiUrl = `${environment.apiUrl}/api/sedes`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  listarTodas(): Observable<Sede[]> {
    return this.http.get<Sede[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    });
  }

  obtenerPorId(id: number): Observable<Sede> {
    return this.http.get<Sede>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  crear(sede: Sede): Observable<Sede> {
    return this.http.post<Sede>(this.apiUrl, sede, {
      headers: this.authService.getAuthHeaders()
    });
  }

  actualizar(id: number, sede: Sede): Observable<Sede> {
    return this.http.put<Sede>(`${this.apiUrl}/${id}`, sede, {
      headers: this.authService.getAuthHeaders()
    });
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
