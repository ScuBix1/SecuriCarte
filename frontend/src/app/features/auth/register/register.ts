import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { Actions } from '../actions/actions';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    Actions,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  @Output() switchToLogin = new EventEmitter<void>();

  hide = true;
  hideConfirm = true;

  registerModel = signal<{ email: string; password: string; confirmPassword: string }>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  isFormValid = computed(() => {
    const { email, password, confirmPassword } = this.registerModel();
    return email.length > 0 && password.length > 0 && confirmPassword === password;
  });

  constructor(private authService: AuthService) {}

  submit() {
    if (!this.isFormValid()) {
      this.errorMessage.set('Les mots de passe ne correspondent pas ou des champs sont vides.');
      return;
    }

    const { email, password } = this.registerModel();

    this.authService.register(email, password).subscribe({
      next: () => {
        this.successMessage.set('Veuillez vérifier votre compte pour vous connecter !');
        this.errorMessage.set(null);
      },
      error: (err: unknown) => {
        console.error(err);
        this.errorMessage.set("Erreur lors de l'inscription.");
        this.successMessage.set(null);
      },
    });
  }
}
