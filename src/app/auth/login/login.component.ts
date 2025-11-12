import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../api/auth.service';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    nombre: '',
    password: ''
  });

  submit() {
    const { nombre, password } = this.loginForm.value;

    this.auth.login(nombre, password).subscribe({
      next: res => {
        this.auth.setToken(res.access_token);
        this.router.navigate(['/inicio']);
      },
      error: err => {
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}