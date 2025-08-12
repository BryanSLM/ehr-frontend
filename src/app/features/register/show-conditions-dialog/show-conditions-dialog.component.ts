import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-show-conditions-dialog',
  standalone: true,
  imports: [ButtonModule, DialogModule, CommonModule],
  templateUrl: './show-conditions-dialog.component.html',
  styleUrl: './show-conditions-dialog.component.css',
})
export class ShowConditionsDialogComponent {
  @Input() isDialogOpen = false;
  @Output() emitDialogToggleStatus: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  closeDialog() {
    this.isDialogOpen = false;
    this.emitDialogToggleStatus.emit(false);
  }
}
