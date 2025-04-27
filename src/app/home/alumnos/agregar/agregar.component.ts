import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlumnoService } from '../../../../api/alumnos';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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

    // Paso 1: Agregar o obtener el tutor
    const tutorData = {
      nombre: alumnoData.nombre_tutor,
      apellido_paterno: alumnoData.apellido_paterno_tutor,
      apellido_materno: alumnoData.apellido_materno_tutor,
      telefono: alumnoData.telefono_tutor
    };

    this.auth.agregarTutor(tutorData).subscribe(
      (tutorResponse) => {
        console.log('Tutor agregado correctamente', tutorResponse);
        
        // Paso 2: Obtener el id_tutor del tutor (si ya existe o es nuevo)
        const idTutor = tutorResponse.id_tutor;
        
        // Paso 3: Agregar el alumno con el id_tutor
        const alumnoToAdd = {
          ...alumnoData,  // Los datos del alumno
          id_tutor: idTutor  // Asigna el id_tutor al alumno
        };

        this.auth.agregarAlumno(alumnoToAdd).subscribe(
          (alumnoResponse) => {
            console.log('Alumno agregado correctamente', alumnoResponse);
          },
          (error) => {
            console.error('Error al agregar alumno', error);
          }
        );
      },
      (error) => {
        console.error('Error al agregar tutor', error);
      }
    );

    this.router.navigate(['/inicio'])
  }
}
