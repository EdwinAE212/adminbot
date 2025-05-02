import { Component } from '@angular/core';
import { AlumnoService } from '../../api/alumnos';
import { response } from 'express';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-alumno-tutor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-alumno-tutor.component.html',
  styleUrl: './card-alumno-tutor.component.css'
})
export class CardAlumnoTutorComponent {

  alumnos: any[] = [];
  modalVisible = false;
  alumnoSeleccionado: any = null;
  
  constructor(private alumnoService: AlumnoService) {}
  
  ngOnInit() {
    this.alumnoService.obtenerAlumnos(this.alumnos).subscribe(
      (response) => this.alumnos = response,
      (error) => console.error('Error al obtener alumnos', error)
    );
  }
  
  abrirModal(alumno: any) {
    this.alumnoSeleccionado = alumno;
    this.modalVisible = true;
  }
  
  cerrarModal() {
    this.modalVisible = false;
    this.alumnoSeleccionado = null;
  }

  filtro: string = '';

alumnosFiltrados() {
  if (!this.filtro.trim()) {
    return this.alumnos;
  }

  const texto = this.filtro.toLowerCase();
  return this.alumnos.filter(alumno =>
    alumno.nombre_alumno.toLowerCase().includes(texto) ||
    alumno.nombre_tutor.toLowerCase().includes(texto)
  );
}

  
}
