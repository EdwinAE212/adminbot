import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' }) 


export class AlumnoService {
  
    constructor(private http: HttpClient) { }


  agregarAlumno(alumno: any): Observable<any> {
    return this.http.post('http://localhost:8000/alumnos', alumno);
  }

  agregarTutor(tutor: any): Observable<any> {
    return this.http.post('http://localhost:8000/tutor', tutor);
  }
}