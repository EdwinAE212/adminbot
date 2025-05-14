import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' }) 


export class AlumnoService {
  
    constructor(private http: HttpClient) { }


  agregarAlumno(alumno: any): Observable<any> {
    return this.http.post('https://bot-educacional-production.up.railway.app//alumnos', alumno);
  }

  agregarTutor(tutor: any): Observable<any> {
    return this.http.post('https://bot-educacional-production.up.railway.app//tutor', tutor);
  }

  obtenerAlumnos(getAlumno: any): Observable<any> {
    return this.http.get('https://bot-educacional-production.up.railway.app//alumnos-tutores', getAlumno);
  }
}