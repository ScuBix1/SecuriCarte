import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  hide = true;
  hideConfirm = true;

  access_token: string | null = null;

  resetModel = signal({
    password: '',
    confirmPassword: '',
  });

  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.access_token = this.route.snapshot.queryParamMap.get('access_token');

    if (!this.access_token && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      this.access_token = hashParams.get('access_token');
    }

    if (!this.access_token) {
      this.errorMessage.set('Lien de réinitialisation invalide ou expiré.');
    }
  }

  async submit() {
    const { password, confirmPassword } = this.resetModel();

    if (password !== confirmPassword) {
      this.errorMessage.set('Les mots de passe ne correspondent pas.');
      return;
    }

    if (!this.access_token) {
      this.errorMessage.set('Token invalide.');
      return;
    }

    this.authService.resetPassword(this.access_token, password).subscribe({
      next: () => {
        this.successMessage.set('Mot de passe réinitialisé avec succès !');
        this.errorMessage.set(null);

        setTimeout(() => {
          this.router.navigate(['/auth']);
        }, 2000);
      },
      error: (err: unknown) => {
        console.error(err);
        this.errorMessage.set('Erreur lors de la réinitialisation du mot de passe.');
        this.successMessage.set(null);
      },
    });
  }
}
