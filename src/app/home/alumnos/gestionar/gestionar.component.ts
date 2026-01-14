import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AgregarComponent } from './../agregar/agregar.component';
import { AlumnoService } from '../../../services/alumno.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestionar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, AgregarComponent],
  templateUrl: './gestionar.component.html',
  styleUrl: './gestionar.component.css'
})
export class GestionarComponent implements OnInit {

  alumnos: any[] = [];

  isAgregarModalOpen = false;
  openingAgregar = false;
  closingAgregar = false;
  isDeleteModalOpen = false;
  alumnoParaEliminar: any = null;
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  alumnoSeleccionado: any = null;

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  openAgregarModal(alumno: any = null): void {
    this.alumnoSeleccionado = alumno;
    this.closingAgregar = false;
    this.isAgregarModalOpen = true;
    setTimeout(() => { this.openingAgregar = true; }, 10);
  }

  closeAgregarModal(): void {
    this.openingAgregar = false;
    this.closingAgregar = true;
    setTimeout(() => {
      this.isAgregarModalOpen = false;
      this.alumnoSeleccionado = null;
      this.cargarAlumnos();
    }, 250);
  }

  confirmarEliminar(alumno: any) {
    this.alumnoParaEliminar = alumno;
    this.isDeleteModalOpen = true;
  }
  constructor(private alumnoService: AlumnoService) {}

cargarAlumnos() {
  this.alumnoService.getAlumnos().subscribe({
    next: (data) => {
      this.alumnos = data;
    },
    error: (err) => {
      console.error('Error al cargar alumnos', err);
    }
  });
}

  get alumnosFiltrados() {
    const filtrados = this.alumnos.filter(alumno => 
      alumno.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      alumno.Matricula.toLowerCase().includes(this.searchText.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return filtrados.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPaginas() {
    const filtrados = this.alumnos.filter(alumno => 
      alumno.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      alumno.Matricula.toLowerCase().includes(this.searchText.toLowerCase())
    );
    return Math.ceil(filtrados.length / this.pageSize);
  }

  onSearchChange() {
    this.currentPage = 1;
  }

eliminarAlumno() {
  if (!this.alumnoParaEliminar) return;

  this.alumnoService.deleteAlumno(this.alumnoParaEliminar._id).subscribe({
    next: () => {
      this.isDeleteModalOpen = false;
      this.alumnoParaEliminar = null;
      this.cargarAlumnos();
    },
    error: (err) => console.error('Error al eliminar', err)
  });
}
}