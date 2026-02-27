import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CurrentUserType } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string) {
    return this.http.post(
      `${this.baseUrl}/auth/login`,
      { email, password },
      {
        withCredentials: true,
      }
    );
  }

  public register(email: string, password: string) {
    return this.http.post(
      `${this.baseUrl}/auth/register`,
      { email, password },
      {
        withCredentials: true,
      }
    );
  }

  public forgotPassword(email: string) {
    return this.http.post(
      `${this.baseUrl}/auth/forgot-password`,
      { email },
      {
        withCredentials: true,
      }
    );
  }

  public resetPassword(access_token: string, new_password: string) {
    return this.http.post(
      `${this.baseUrl}/auth/reset-password`,
      {
        access_token,
        new_password,
      },
      {
        withCredentials: true,
      }
    );
  }

  public getCurrentUser(): Observable<CurrentUserType> {
    return this.http.get<CurrentUserType>(`${this.baseUrl}/auth/me`, {
      withCredentials: true,
    });
  }

  public logout(): void {
    this.http.post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true }).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
