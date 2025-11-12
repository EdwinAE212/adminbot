import { Component, EventEmitter, Output } from '@angular/core'; // <-- Importar para eventos
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// Asegúrate de que esta ruta sea correcta para tu servicio
import { AlumnoService } from '../../../../api/alumnos'; 

@Component({
  selector: 'app-agregar',
  standalone: true,
  // ReactiveFormsModule es necesario para [formGroup]
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent {
  
  // 1. EVENTO DE SALIDA: Notificará al componente padre que se ha guardado
  @Output() alumnoAgregado = new EventEmitter<void>();

  form!: FormGroup;

  // Corregido: Agregado 'email_tutor' al FormGroup
  constructor(private fb: FormBuilder, private auth: AlumnoService, private router: Router) {
    this.form = this.fb.group({
      // Campos del alumno
      Matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      email: ['', [Validators.email]], // Email no obligatorio, pero valida formato
      telefono: [''],
      
      // Campos del tutor
      nombre_tutor: ['', Validators.required],
      apellido_paterno_tutor: ['', Validators.required],
      apellido_materno_tutor: ['', Validators.required],
      telefono_tutor: ['', Validators.required],
      email_tutor: ['', [Validators.email]], // Añadido campo de email del tutor
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
      console.log('Formulario no válido');
      return;
    }

    const alumnoData = this.form.value;
    
    // ... Lógica de agregar tutor y luego alumno ...

    // Simulando el envío exitoso
    this.auth.agregarTutor(alumnoData).subscribe(
      (tutorResponse) => {
        const idTutor = tutorResponse.id_tutor; 
        const alumnoToAdd = { ...alumnoData, id_tutor: idTutor };

        this.auth.agregarAlumno(alumnoToAdd).subscribe(
          (alumnoResponse) => {
            console.log('Alumno y Tutor agregados correctamente');
            
            // 2. EMITIR EL EVENTO para que el padre cierre el modal
            this.alumnoAgregado.emit(); 
            this.form.reset(); // Limpia el formulario
            
            // NOTA: Se elimina la redirección: this.router.navigate(['/inicio'])
          },
          (error) => { console.error('Error al agregar alumno', error); }
        );
      },
      (error) => { console.error('Error al agregar tutor', error); }
    );
  }
}