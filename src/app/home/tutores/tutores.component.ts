import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlumnoService } from '../../services/alumno.service';
import { AgregarComponent } from '../alumnos/agregar/agregar.component';

@Component({
  selector: 'app-tutores',
  standalone: true,
  imports: [CommonModule, FormsModule, AgregarComponent],
  templateUrl: './tutores.component.html',
  styleUrl: './tutores.component.css'
})
export class TutoresComponent implements OnInit {
  tutores: any[] = [];
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  isEditModalOpen = false;
  openingEdit = false;
  closingEdit = false;
  tutorSeleccionado: any = null;

  constructor(private alumnoService: AlumnoService) {}

  ngOnInit(): void {
    this.cargarTutores();
  }

  cargarTutores() {
    this.alumnoService.getAlumnos().subscribe({
      next: (data) => {
        this.tutores = data;
      },
      error: (err) => console.error('Error al cargar tutores', err)
    });
  }

  get tutoresFiltrados() {
    const filtrados = this.tutores.filter(t => 
      t.nombre_tutor.toLowerCase().includes(this.searchText.toLowerCase()) ||
      t.Matricula.toLowerCase().includes(this.searchText.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return filtrados.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPaginas() {
    const filtrados = this.tutores.filter(t => 
      t.nombre_tutor.toLowerCase().includes(this.searchText.toLowerCase()) ||
      t.Matricula.toLowerCase().includes(this.searchText.toLowerCase())
    );
    return Math.ceil(filtrados.length / this.pageSize);
  }

  onSearchChange() {
    this.currentPage = 1;
  }

  // Funciones del Modal
  openEditModal(tutor: any): void {
    this.tutorSeleccionado = tutor;
    this.closingEdit = false;
    this.isEditModalOpen = true;
    setTimeout(() => { this.openingEdit = true; }, 10);
  }

  closeEditModal(): void {
    this.openingEdit = false;
    this.closingEdit = true;
    setTimeout(() => {
      this.isEditModalOpen = false;
      this.tutorSeleccionado = null;
      this.cargarTutores();
    }, 250);
  }
}