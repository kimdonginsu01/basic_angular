import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { baseUrl } from '../shared/constants/constant';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = !!localStorage.getItem('user');

  constructor(private httpService: HttpService) {}

  login(credentials?: any): Observable<any> {
    return this.httpService.get(baseUrl + `/users`, credentials);
  }

  logout() {
    localStorage.removeItem('user');
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser() {
    const info = localStorage.getItem('user');
    return JSON.parse(info as string);
  }

  isAdmin() {
    const info = localStorage.getItem('user');
    if (info) {
      const { isAdmin } = JSON.parse(info);
      return !!isAdmin;
    }
    return false;
  }
}
