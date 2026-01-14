import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JefeModalComponent } from '../jefe-modal/jefe-modal.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jefe-de-grupo',
  standalone: true,
  imports: [CommonModule, JefeModalComponent, FormsModule], 
  templateUrl: './jefe-de-grupo.component.html',
  styleUrl: './jefe-de-grupo.component.css'
})
export class JefeDeGrupoComponent implements OnInit {
  jefesDeGrupo: any[] = [];
  
  searchText: string = '';
  currentPage: number = 1;
  pageSize: number = 10;

  isAgregarModalOpen = false;
  openingAgregar = false;
  closingAgregar = false;
  
  isDeleteModalOpen = false;
  jefeParaEliminar: any = null;

  private apiUrl = 'http://localhost:3000/api/jefes_grupo';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarJefes();
  }

  cargarJefes() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => { this.jefesDeGrupo = data; },
      error: (err) => console.error("Error al cargar jefes:", err)
    });
  }

  get jefesFiltrados() {
    const filtrados = this.jefesDeGrupo.filter(jefe => 
      jefe.matricula.toLowerCase().includes(this.searchText.toLowerCase()) ||
      (jefe.datosAlumno?.carrera && jefe.datosAlumno.carrera.toLowerCase().includes(this.searchText.toLowerCase()))
    );
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return filtrados.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPaginas() {
    const filtrados = this.jefesDeGrupo.filter(jefe => 
      jefe.matricula.toLowerCase().includes(this.searchText.toLowerCase()) ||
      (jefe.datosAlumno?.carrera && jefe.datosAlumno.carrera.toLowerCase().includes(this.searchText.toLowerCase()))
    );
    return Math.ceil(filtrados.length / this.pageSize);
  }

  onSearchChange() {
    this.currentPage = 1;
  }

  confirmarEliminar(jefe: any) {
    this.jefeParaEliminar = jefe;
    this.isDeleteModalOpen = true;
  }

  eliminarJefe() {
    if (!this.jefeParaEliminar) return;
    this.http.delete(`${this.apiUrl}/${this.jefeParaEliminar._id}`).subscribe({
      next: () => {
        this.isDeleteModalOpen = false;
        this.jefeParaEliminar = null;
        this.cargarJefes();
      },
      error: (err) => console.error("Error al eliminar", err)
    });
  }

  openAgregarModal(): void {
    this.closingAgregar = false;
    this.isAgregarModalOpen = true;
    setTimeout(() => { this.openingAgregar = true; }, 10);
  }

  closeAgregarModal(): void {
    this.openingAgregar = false;
    this.closingAgregar = true;
    setTimeout(() => {
      this.isAgregarModalOpen = false;
      this.cargarJefes();
    }, 250);
  }
}