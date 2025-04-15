import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-redactar',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './redactar.component.html',
  styleUrl: './redactar.component.css'
})
export default class RedactarComponent {

}
