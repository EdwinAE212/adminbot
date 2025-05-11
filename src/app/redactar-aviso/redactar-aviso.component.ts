import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-redactar-aviso',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './redactar-aviso.component.html',
  styleUrl: './redactar-aviso.component.css'
})
export class RedactarAvisoComponent {
  imagePreview: string | ArrayBuffer | null = null;
  selectedImage: File | null = null;
  fechaCaducidad: string = '';

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
    console.log('Fecha de caducidad:', this.fechaCaducidad);

    if (this.selectedImage) {
      console.log('Imagen seleccionada:', this.selectedImage);
      // Puedes usar FormData para enviar al backend si es necesario
    }

    // Aquí iría el resto del procesamiento del formulario
  }
}

