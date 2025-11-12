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
    loadComponent: () => import('./home/inicio/inicio.component').then(m => m.InicioComponent) 
  },
  { 
    path: 'agregar', 
    loadComponent: () => import('./home/alumnos/agregar/agregar.component').then(m => m.AgregarComponent) 
  },
  { 
    path: 'tutores', 
    loadComponent: () => import('./home/tutores/tutores.component').then(m => m.TutoresComponent) 
  },
  { 
    path: 'addmin', 
    loadComponent: () => import('./home/administracion/addmin/addmin.component').then(m => m.AddminComponent) 
  },
  { 
    path: 'perfil',
    loadComponent: () => import('./perfilad/perfilad.component').then(m => m.PerfilComponent)
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];