import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-redactar-aviso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './redactar-aviso.component.html',
  styleUrl: './redactar-aviso.component.css'
})
export class RedactarAvisoComponent {
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
      // Aquí puedes armar un FormData para enviar al backend
    }
    // Aquí iría el resto del procesamiento del formulario
  }
}
