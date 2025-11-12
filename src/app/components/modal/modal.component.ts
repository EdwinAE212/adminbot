import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  closing = false;

  close() {
    this.closing = true;
    setTimeout(() => {
      this.closeModal.emit();
      this.closing = false;
    }, 300);
  }
}
