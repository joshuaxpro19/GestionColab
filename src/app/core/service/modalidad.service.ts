import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Modalidad {
    id?: number;
    title: string;
    descipcion?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ModalidadService {
    private apiUrl = `${environment.apiUrl}/api/modalidades`;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    listarTodas(): Observable<Modalidad[]> {
        return this.http.get<Modalidad[]>(this.apiUrl, {
            headers: this.authService.getAuthHeaders()
        });
    }

    obtenerPorId(id: number): Observable<Modalidad> {
        return this.http.get<Modalidad>(`${this.apiUrl}/${id}`, {
            headers: this.authService.getAuthHeaders()
        });
    }

    crear(modalidad: Modalidad): Observable<Modalidad> {
        return this.http.post<Modalidad>(this.apiUrl, modalidad, {
            headers: this.authService.getAuthHeaders()
        });
    }

    actualizar(id: number, modalidad: Modalidad): Observable<Modalidad> {
        return this.http.put<Modalidad>(`${this.apiUrl}/${id}`, modalidad, {
            headers: this.authService.getAuthHeaders()
        });
    }

    eliminar(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`, {
            headers: this.authService.getAuthHeaders()
        });
    }
}
