import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-actions',
  imports: [MatButtonModule],
  templateUrl: './actions.html',
  styleUrl: './actions.scss',
})
export class Actions {
  @Input() mode: 'login' | 'register' = 'login';

  @Output() toggle = new EventEmitter<void>();
}
