import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addmin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addmin.component.html',
  styleUrl: './addmin.component.css'
})
export class AddminComponent implements OnInit {
  formAdmin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formAdmin = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmarPassword')?.value
      ? null : { mismatch: true };
  }

  guardarAdmin() {
    if (this.formAdmin.invalid) {
      alert('Por favor, revisa los datos y asegúrate de que las contraseñas coincidan.');
      return;
    }

    const { confirmarPassword, ...datosAEnviar } = this.formAdmin.value;

    this.http.post('http://localhost:3000/api/admins', datosAEnviar).subscribe({
      next: (res: any) => {
        this.formAdmin.reset();
      },
      error: (err) => {
        alert(err.error.message || 'Error al guardar');
      }
    });
  }
}