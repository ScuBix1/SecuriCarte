import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  public errorMessage = signal<string | null>(null);
  public successMessage = signal<string | null>(null);
  public email = signal('');

  public forgotPasswordModel = signal<{ email: string }>({
    email: '',
  });

  public constructor(private authService: AuthService) {}

  public async submit() {
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
