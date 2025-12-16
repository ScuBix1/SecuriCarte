import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  email = signal('');

  forgotPasswordModel = signal<{ email: string }>({
    email: '',
  });

  constructor(private authService: AuthService) {}

  async submit() {
    const { email } = this.forgotPasswordModel();
    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.successMessage.set('Un mail a été envoyé !');
        this.errorMessage.set(null);
      },
      error: (err: unknown) => {
        console.error(err);
        this.errorMessage.set("Erreur lors de l'envoie du mail.");
        this.successMessage.set(null);
      },
    });
  }
}
