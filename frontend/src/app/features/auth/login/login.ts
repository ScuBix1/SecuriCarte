import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Actions } from '../actions/actions';
import { AuthService } from '../auth.service';

export interface LoginFormModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    Actions,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  @Output() switchToRegister = new EventEmitter<void>();

  hide = true;
  loginModel = signal<{ email: string; password: string }>({ email: '', password: '' });
  errorMessage = signal<string | null>(null);

  isFormValid = computed(() => {
    const model = this.loginModel();
    return model.email.length > 0 && model.password.length > 0;
  });

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    if (!this.isFormValid()) return;

    this.authService.login(this.loginModel().email, this.loginModel().password).subscribe({
      next: () => {
        window.location.href = '/maps';
      },
      error: (err: unknown) => {
        this.errorMessage.set('Erreur de connexion. Vérifiez vos identifiants.');
        console.error(err);
      },
    });
  }
}
