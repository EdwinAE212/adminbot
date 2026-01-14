import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent implements OnInit {
  private http = inject(HttpClient);

  reporte = {
    asunto: '',
    carreraSeleccionada: '',
    grupoId: '', // Aquí guardaremos el _id para el backend
    descripcion: ''
  };

  carreras: string[] = [];
  todosLosGrupos: any[] = [];
  gruposFiltrados: any[] = [];
  imagePreview: string | ArrayBuffer | null = null;
  selectedImage: File | null = null;

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales() {
    // Usamos la ruta que YA SABEMOS que funciona
    this.http.get<any[]>('http://localhost:3000/api/grupos').subscribe({
      next: (data) => {
        this.todosLosGrupos = data;
        // Extraemos las carreras únicas de los grupos (Igual que en Alumnos)
        this.carreras = [...new Set(data.map(g => g.carrera))];
      },
      error: (err) => console.error("Error al cargar grupos", err)
    });
  }

  onCarreraChange() {
    this.reporte.grupoId = ''; 
    // Filtramos los grupos que pertenecen a la carrera elegida
    this.gruposFiltrados = this.todosLosGrupos.filter(g => g.carrera === this.reporte.carreraSeleccionada);
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => { this.imagePreview = reader.result; };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (!this.reporte.grupoId || !this.reporte.asunto) {
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    const formData = new FormData();
    formData.append('asunto', this.reporte.asunto);
    formData.append('grupoId', this.reporte.grupoId); // Enviamos el ID del grupo
    formData.append('descripcion', this.reporte.descripcion);
    
    if (this.selectedImage) {
      formData.append('imagen', this.selectedImage);
    }

    this.http.post('http://localhost:3000/api/email/enviar-al-jefe', formData).subscribe({
      next: () => {
        alert('Aviso enviado correctamente al Jefe de Grupo.');
        this.limpiarFormulario();
      },
      error: (err) => alert('Error al enviar: ' + (err.error?.message || 'Error del servidor'))
    });
  }

  limpiarFormulario() {
    this.reporte = { asunto: '', carreraSeleccionada: '', grupoId: '', descripcion: '' };
    this.imagePreview = null;
    this.selectedImage = null;
    this.gruposFiltrados = [];
  }
}