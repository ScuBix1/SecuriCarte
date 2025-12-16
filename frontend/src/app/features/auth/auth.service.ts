import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = '/api'; // à mettre à jour
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password });
  }

  register(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth/register`, { email, password });
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.baseUrl}/auth/forgot-password`, { email });
  }

  resetPassword(access_token: string, new_password: string) {
    return this.http.post(`${this.baseUrl}/auth/reset-password`, {
      access_token,
      new_password,
    });
  }
}
