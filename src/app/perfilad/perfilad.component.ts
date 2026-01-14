import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule], 
  templateUrl: './perfilad.component.html',
  styleUrl: './perfilad.component.css'
})
export class PerfilComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);

  mostrarCambio = false;
  error = '';
  adminId: string | null = null;

  admin = {
    usuario: '',
    email: '',
    telefono: ''
  };

  passwords = {
    nueva: '',
    confirmar: ''
  };

  ngOnInit() {
    this.adminId = this.authService.getAdminId();
    if (this.adminId) {
      this.cargarDatosUsuario();
    } else {
      this.router.navigate(['/login']);
    }
  }

  cargarDatosUsuario() {
    this.authService.getProfile(this.adminId!).subscribe({
      next: (data) => {
        this.admin.usuario = data.usuario;
        this.admin.email = data.email;
        this.admin.telefono = data.telefono;
      },
      error: (err) => {
        console.error('Error al cargar datos:', err);
        this.error = 'No se pudo cargar la información del perfil.';
      }
    });
  }

  guardarTodo() {
    this.error = '';

    if (this.mostrarCambio) {
      if (!this.passwords.nueva || !this.passwords.confirmar) {
        this.error = 'Debes llenar ambos campos de contraseña.';
        return;
      }
      if (this.passwords.nueva !== this.passwords.confirmar) {
        this.error = 'Las contraseñas no coinciden.';
        return;
      }
      if (this.passwords.nueva.length < 6) {
        this.error = 'La contraseña debe tener al menos 6 caracteres.';
        return;
      }
    }

    const body: any = {
      usuario: this.admin.usuario,
      email: this.admin.email,
      telefono: this.admin.telefono
    };

    if (this.mostrarCambio) {
      body.password = this.passwords.nueva;
    }

    this.http.put(`http://localhost:3000/api/admins/${this.adminId}`, body).subscribe({
      next: () => {
        alert('¡Perfil actualizado con éxito!');
        this.mostrarCambio = false;
        this.passwords = { nueva: '', confirmar: '' };
        // Opcional: recargar datos
        this.cargarDatosUsuario();
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al actualizar el perfil.';
      }
    });
  }
}