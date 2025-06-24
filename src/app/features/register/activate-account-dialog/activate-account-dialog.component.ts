import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-activate-account-dialog',
  standalone: true,
  imports: [ButtonModule, DialogModule],
  templateUrl: './activate-account-dialog.component.html',
  styleUrl: './activate-account-dialog.component.css',
})
export class ActivateAccountDialogComponent {
  @Input() isDialogOpen = false;
  @Output() emitDialogToogleStatus: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  closeDialog() {
    this.isDialogOpen = false;
    this.emitDialogToogleStatus.emit(false);
  }
}
