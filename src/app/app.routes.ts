import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'inicio', 
    loadComponent: () => import('./home/inicio/inicio.component')
  },
  { 
    path: 'redactar', 
    loadComponent: () => import('./home/redactar/redactar.component') 
  },
  { 
    path: 'agregar', 
    loadComponent: () => import('./home/alumnos/agregar/agregar.component') 
  },
  { 
    path: 'addmin', 
    loadComponent: () => import('./home/administracion/addmin/addmin.component') 
  },
  { 
    path: '**', 
    redirectTo: 'login' }
];
