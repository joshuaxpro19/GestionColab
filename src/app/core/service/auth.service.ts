import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  constructor(private http: HttpClient) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  login(username: string, password: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, 
      { username, password }, 
      { responseType: 'text' }
    );
  }

  saveToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      console.log('💾 Token guardado en localStorage');
      console.log('Token (primeros 20 chars):', token.substring(0, 20) + '...');
    } else {
      console.warn('⚠️ No se puede guardar token: no estamos en el navegador');
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      console.log('🔍 getToken() llamado, token existe:', token !== null);
      return token;
    }
    console.warn('⚠️ getToken() llamado pero no estamos en el navegador');
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const authenticated = token !== null && token.length > 0;
    console.log('🔐 isAuthenticated():', authenticated);
    return authenticated;
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
}
