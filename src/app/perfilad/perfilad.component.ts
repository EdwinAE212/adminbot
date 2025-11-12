import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule], 
  templateUrl: './perfilad.component.html',
  styleUrl: './perfilad.component.css'
})

export class PerfilComponent implements OnInit {

  mostrarCambio = false;
  error = '';

  // --- Objeto para los datos del admin ---
  // El HTML ahora se vincula a admin.usuario, admin.email, etc.
  admin = {
    usuario: '',
    email: '',
    telefono: ''
  };

  // --- Objeto para las contraseñas ---
  // El HTML ahora se vincula a passwords.nueva y passwords.confirmar
  passwords = {
    nueva: '',
    confirmar: ''
  };

  // Inyectamos los servicios que probablemente necesitarás
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    // Aquí deberías llamar a tu servicio para obtener los datos
    // del administrador y rellenar el objeto 'admin'.
    
    // Ejemplo (reemplaza esto con tu lógica real):
    // this.authService.getMiPerfil().subscribe(data => {
    //   this.admin.usuario = data.usuario;
    //   this.admin.email = data.email;
    //   this.admin.telefono = data.telefono;
    // });

    // --- Datos de placeholder (BORRA ESTO EN PRODUCCIÓN) ---
    this.admin = {
      usuario: 'NombreAdminActual',
      email: 'admin@correo.com',
      telefono: '6621234567'
    };
  }

  guardarTodo() {
    this.error = '';
    console.log('Guardando datos del perfil:', this.admin);

    if (this.mostrarCambio) {
      if (this.passwords.nueva.trim() === '' || this.passwords.confirmar.trim() === '') {
        this.error = 'Debes llenar ambos campos de contraseña para cambiarla.';
        return;
      }
      
      if (this.passwords.nueva.trim().length < 6) {
        this.error = 'La contraseña debe tener al menos 6 caracteres.';
        return;
      }
      
      if (this.passwords.nueva !== this.passwords.confirmar) {
        this.error = 'Las contraseñas no coinciden.';
        return;
      }

      console.log('Cambiando contraseña...');
      // this.authService.cambiarContrasena(this.passwords.nueva).subscribe(response => {
      //   console.log('Contraseña cambiada con éxito');
      //   this.mostrarCambio = false; // Ocultar formulario de contraseña
      //   this.passwords = { nueva: '', confirmar: '' }; // Limpiar campos
      // }, err => {
      //   this.error = 'Error al cambiar la contraseña.';
      // });
    }

    // Si no hubo errores (o no se cambió la contraseña), puedes mostrar un éxito
    if (this.error === '') {
      alert('¡Cambios guardados con éxito!');
      this.mostrarCambio = false;
      this.passwords = { nueva: '', confirmar: '' };
    }
  }
}

