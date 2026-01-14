import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../../services/alumno.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jefe-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jefe-modal.component.html'
})
export class JefeModalComponent implements OnInit {
  @Output() jefeAgregado = new EventEmitter<void>();
  
  form!: FormGroup;
  alumnosDisponibles: any[] = [];
  alumnoSeleccionado: any = null;

  constructor(
    private fb: FormBuilder, 
    private alumnoService: AlumnoService,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      matricula: ['', Validators.required],
      grupo: [{ value: '', disabled: true }, Validators.required],
      carreraAlumno: [{ value: '', disabled: true }],
      nombreAlumno: [{ value: '', disabled: true }],
      telefonoAlumno: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.alumnoService.getAlumnos().subscribe({
      next: (data) => {
        this.alumnosDisponibles = data;
      },
      error: (err) => console.error("Error al cargar alumnos para el modal:", err)
    });
  }

  onMatriculaChange(event: any) {
    const matricula = event.target.value;
    const alumno = this.alumnosDisponibles.find(a => a.Matricula === matricula);

    if (alumno) {
      this.alumnoSeleccionado = alumno;
      this.form.patchValue({
        grupo: alumno.grupo,
        carreraAlumno: alumno.carrera,
        nombreAlumno: `${alumno.nombre} ${alumno.apellido_paterno} ${alumno.apellido_materno}`,
        telefonoAlumno: alumno.telefono
      });
    } else {
      this.alumnoSeleccionado = null;
      this.form.patchValue({ 
        grupo: '', 
        carreraAlumno: '', 
        nombreAlumno: '', 
        telefonoAlumno: '' 
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    
    const formData = this.form.getRawValue();
    
    const nuevoJefe = {
      grupo: formData.grupo,
      matricula: formData.matricula
    };

    console.log("Enviando asignación de Jefe:", nuevoJefe);

    this.http.post('http://localhost:3000/api/jefes_grupo', nuevoJefe).subscribe({
      next: (res) => {
        this.jefeAgregado.emit(); 
      },
      error: (err) => {
        const msg = err.error?.message || 'Error al asignar jefe de grupo';
        alert(msg);
      }
    });
  }
}