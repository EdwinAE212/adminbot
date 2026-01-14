import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { RedactarAvisoComponent } from '../../redactar-aviso/redactar-aviso.component';
import { ReporteComponent } from '../../reporte/reporte.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, ModalComponent, RedactarAvisoComponent, ReporteComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  auth = inject(AuthService);
  router = inject(Router);

  modalAvisoOpen = false;
  modalReporteOpen = false;
  
  logout() {
    this.auth.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
