import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    usuario: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/inicio']);
    }
  }

  submit() {
    if (this.loginForm.invalid) return;

    const { usuario, password } = this.loginForm.value;

    this.auth.login(usuario, password).subscribe({
      next: (res) => {
        this.auth.setToken(res.access_token);
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Usuario o contraseña incorrectos');
      }
    });
  }
}