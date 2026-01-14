import { Routes } from '@angular/router';
import { authGuard } from '../app/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'inicio', 
    canActivate: [authGuard],
    loadComponent: () => import('./home/inicio/inicio.component').then(m => m.InicioComponent) 
  },
  { 
    path: 'agregar', 
    canActivate: [authGuard],
    loadComponent: () => import('./home/alumnos/agregar/agregar.component').then(m => m.AgregarComponent) 
  },
  { 
    path: 'tutores', 
    canActivate: [authGuard],
    loadComponent: () => import('./home/tutores/tutores.component').then(m => m.TutoresComponent) 
  },
  { 
    path: 'jefe-de-grupo', 
    canActivate: [authGuard],
    loadComponent: () => import('./home/alumnos/jefe-de-grupo/jefe-de-grupo.component').then(m => m.JefeDeGrupoComponent) 
  },
  { 
    path: 'addmin', 
    canActivate: [authGuard],
    loadComponent: () => import('./home/administracion/addmin/addmin.component').then(m => m.AddminComponent) 
  },
  { 
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () => import('./perfilad/perfilad.component').then(m => m.PerfilComponent)
  },
  { path: '**', redirectTo: 'login' }
];