import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnoService } from '../../../../api/alumnos';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export default class AgregarComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AlumnoService, private router: Router) {
    this.form = this.fb.group({
      // Campos del alumno
      Matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      email: [''],
      telefono: [''],
      
      // Campos del tutor
      nombre_tutor: ['', Validators.required],
      apellido_paterno_tutor: ['', Validators.required],
      apellido_materno_tutor: ['', Validators.required],
      telefono_tutor: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('Formulario no válido');
      return; // No enviar datos si el formulario es inválido
    }

    const alumnoData = this.form.value;
    console.log('Datos del alumno y tutor:', alumnoData);

    // Enviar los datos a las APIs correspondientes
    this.auth.agregarAlumno(alumnoData).subscribe(
      (response) => {
        console.log('Alumno agregado correctamente');
      },
      (error) => {
        console.error('Error al agregar alumno', error);
      }
    );

    this.auth.agregarTutor(alumnoData).subscribe(
      (response) => {
        console.log('Tutor agregado correctamente');
      },
      (error) => {
        console.error('Error al agregar tutor', error);
      }
    );
  }
}
