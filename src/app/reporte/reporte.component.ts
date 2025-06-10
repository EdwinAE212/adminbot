  import { Component } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  
  @Component({
    selector: 'reporte',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './reporte.component.html',
    styleUrl: './reporte.component.css'
  })
  export default class ReporteComponent {
    imagePreview: string | ArrayBuffer | null = null;
    selectedImage: File | null = null;
  
    onImageSelected(event: any): void {
      const file = event.target.files[0];
      if (file) {
        this.selectedImage = file;
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
      }
    }
  
    onSubmit(): void {
      if (this.selectedImage) {
        console.log('Imagen seleccionada:', this.selectedImage);
      }
      // Procesar resto del formulario
    }
  }
  