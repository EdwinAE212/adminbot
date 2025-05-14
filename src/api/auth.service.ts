import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';


@Injectable({ providedIn: 'root' })


export class AuthService {
  private http = inject(HttpClient);

  token = signal<string | null>(null);

  login(nombre: string, password: string) {
    return this.http.post<{ access_token: string }>('https://bot-educacional-production.up.railway.app//login', {
      nombre,
      password
    });
  }

  setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('token', token);
  }

  getToken() {
    return this.token() || localStorage.getItem('token');
  }

  logout() {
    this.token.set(null);
    localStorage.removeItem('token');
  }
}
