import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  // URL de tu servidor Node.js
  private apiUrl = 'http://localhost:3000/api/alumnos';

  constructor(private http: HttpClient) {}

  // Obtener todos
  getAlumnos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateAlumno(id: string, alumno: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, alumno);
}

  // Guardar nuevo
  saveAlumno(alumno: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, alumno);
  }

  // Eliminar
  deleteAlumno(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}