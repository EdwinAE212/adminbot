import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../home/header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './perfilad.component.html',
  styleUrl: './perfilad.component.css'
})

export class PerfilComponent {
  usuario = '';
  mostrarCambio = false;
  nuevaContrasena = '';
  confirmarContrasena = '';
  error = '';

  cambiarContrasena() {
    this.error = '';

    if (this.nuevaContrasena.trim().length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }
  }
} 

