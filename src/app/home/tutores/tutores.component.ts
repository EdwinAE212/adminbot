import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tutores',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './tutores.component.html',
  styleUrl: './tutores.component.css'
})
export class TutoresComponent implements OnInit { 
  tutores: any[] = []; 
  
  // tutores: any[] = [
  //    { nombre_tutor: 'José', apellido_paterno_tutor: 'Hernández', apellido_materno_tutor: 'Sánchez', telefono_tutor: '5511223344', matricula_alumno: '1001', email_tutor: 'jose.h@mail.com' },
  //    { nombre_tutor: 'María', apellido_paterno_tutor: 'Pérez', apellido_materno_tutor: 'Gómez', telefono_tutor: '5599887766', matricula_alumno: '1005', email_tutor: 'maria.p@mail.com' },
  // ];

  ngOnInit(): void {
    // Aquí es donde harías la llamada a tu servicio para cargar los datos de los tutores.
  }

}