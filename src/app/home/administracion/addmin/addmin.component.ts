import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-addmin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './addmin.component.html',
  styleUrl: './addmin.component.css'
})
export class AddminComponent {
  admin = {
    usuario: '',
    email: '',
    telefono: '',
    contraseña: ''
  };

  guardarAdmin() {
    // Aquí puedes mandar el admin al backend
  }
}
