import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlumnoService } from '../../../services/alumno.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  
  @Output() alumnoAgregado = new EventEmitter<void>();
  @Input() alumnoAEditar: any = null; 

  form!: FormGroup;
  carreras: string[] = [];
  todosLosGrupos: any[] = [];
  gruposFiltrados: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private alumnoService: AlumnoService,
    private http: HttpClient
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.cargarGrupos();
  }

  initForm() {
    this.form = this.fb.group({
      Matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      carrera: ['', Validators.required],
      grupo: [{ value: '', disabled: true }, Validators.required],
      nombre_tutor: ['', Validators.required],
      apellido_paterno_tutor: ['', Validators.required],
      apellido_materno_tutor: ['', Validators.required],
      telefono_tutor: ['', Validators.required],
      email_tutor: ['', [Validators.email]],
    });
  }

  cargarGrupos() {
    this.http.get<any[]>('http://localhost:3000/api/grupos').subscribe({
      next: (data) => {
        this.todosLosGrupos = data;
        this.carreras = [...new Set(data.map(g => g.carrera))];
        
        if (this.alumnoAEditar) {
          this.form.patchValue(this.alumnoAEditar);
          this.onCarreraChange(this.alumnoAEditar.carrera);
          this.form.get('grupo')?.setValue(this.alumnoAEditar.grupo);
        }
      },
      error: (err) => console.error("Error al cargar grupos", err)
    });
  }

  onCarreraChange(carreraSeleccionada: string) {
    this.gruposFiltrados = this.todosLosGrupos.filter(g => g.carrera === carreraSeleccionada);
    this.form.get('grupo')?.enable();
    if (!this.alumnoAEditar) {
        this.form.get('grupo')?.setValue('');
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    const data = this.form.getRawValue();

    const action = this.alumnoAEditar 
      ? this.alumnoService.updateAlumno(this.alumnoAEditar._id, data)
      : this.alumnoService.saveAlumno(data);

    action.subscribe({
      next: () => {
        this.alumnoAgregado.emit();
        this.form.reset();
      },
      error: (err) => console.error('Error en la operación', err)
    });
  }
}