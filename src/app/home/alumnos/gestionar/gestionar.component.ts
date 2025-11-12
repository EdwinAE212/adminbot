import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AgregarComponent } from './../agregar/agregar.component'; 

@Component({
  selector: 'app-gestionar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AgregarComponent], 
  templateUrl: './gestionar.component.html',
  styleUrl: './gestionar.component.css'
})
export class GestionarComponent implements OnInit {

  alumnos: any[] = [];
  isAgregarModalOpen: boolean = false; 

  constructor() { }

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    console.log("Cargando alumnos...");
    // Ejemplo de datos para probar la tabla:
    // this.alumnos = [
    //    { Matricula: '1001', nombre: 'Ana', apellido_paterno: 'García', apellido_materno: 'López', email: 'ana@mail.com', telefono: '1234567890' },
    // ];
  }

  openAgregarModal(): void {
    this.isAgregarModalOpen = true;
  }

  closeAgregarModal(): void {
    this.isAgregarModalOpen = false;
    this.cargarAlumnos(); 
  }
}
