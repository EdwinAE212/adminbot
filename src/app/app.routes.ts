import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { RedactarComponent } from './home/redactar/redactar.component';
import { AgregarComponent } from './home/alumnos/agregar/agregar.component';
import { AddminComponent } from './home/administracion/addmin/addmin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'redactar', component: RedactarComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: 'addmin', component: AddminComponent },
  { path: '**', redirectTo: 'login' }
];
