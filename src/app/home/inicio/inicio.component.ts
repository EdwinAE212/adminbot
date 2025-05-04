import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../api/auth.service';
import { Router } from '@angular/router';
import AgregarComponent from "../alumnos/agregar/agregar.component";
import { CardAlumnoTutorComponent } from "../../card-alumno-tutor/card-alumno-tutor.component";
import { RedactarAvisoComponent } from '../../redactar-aviso/redactar-aviso.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HeaderComponent, RouterModule, AgregarComponent, CardAlumnoTutorComponent, RedactarAvisoComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export default class InicioComponent {

  auth = inject(AuthService);
  router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
