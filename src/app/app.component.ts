import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  // Define rutas donde NO se muestra el layout
  showLayout(): boolean {
    const hideOn = ['/login'];
    return !hideOn.includes(this.router.url);
  }
}
