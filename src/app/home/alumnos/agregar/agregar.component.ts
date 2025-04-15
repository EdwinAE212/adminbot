import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})

export default class AgregarComponent {
  alumno = {
    matricula: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',
    tutor: {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      telefono: '' 
    }  
    }

    guardarAlumno() {
      // Aquí puedes integrar una petición HTTP para guardar en la base de datos
    }
}