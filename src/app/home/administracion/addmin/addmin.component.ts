import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-addmin',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './addmin.component.html',
  styleUrl: './addmin.component.css'
})
export class AddminComponent {
  admin = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',
    contraseña: ''
  };

  guardarAdmin() {
    // Aquí puedes mandar el admin al backend
  }
}
