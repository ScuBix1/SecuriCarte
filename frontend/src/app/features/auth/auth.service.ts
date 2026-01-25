import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post(
      `${this.baseUrl}/auth/login`,
      { email, password },
      {
        withCredentials: true,
      }
    );
  }

  register(email: string, password: string) {
    return this.http.post(
      `${this.baseUrl}/auth/register`,
      { email, password },
      {
        withCredentials: true,
      }
    );
  }

  forgotPassword(email: string) {
    return this.http.post(
      `${this.baseUrl}/auth/forgot-password`,
      { email },
      {
        withCredentials: true,
      }
    );
  }

  resetPassword(access_token: string, new_password: string) {
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
}
