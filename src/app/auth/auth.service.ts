import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from './auth.interface';
import {catchError, tap, throwError} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);
  baseURL = 'https://icherniakov.ru/yt-course/auth/';
  token: string | null = null;
  refreshToken: string | null = null;
  get isAuth() {
    if (!this.token) {
      this.token = this.cookieService.get('access_token');
      this.refreshToken = this.cookieService.get('refresh_token');
    }
    return !!this.token;
  }
  logout() {
    this.cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }
  login(payload: {username: string, password: string}) {
    const fd = new FormData();
    fd.append('username', payload.username.trim());
    fd.append('password', payload.password.trim());
    return this.http.post<TokenResponse>(`${this.baseURL}token`, fd).pipe(
      tap((response) => {
        this.updateToken(response);
      }
    ))
  }
  authRefresh() {
    return this.http.post<TokenResponse>(`${this.baseURL}refresh`, {
      refresh_token: this.refreshToken
    }).pipe(
      tap((response) => {
        this.updateToken(response);
      }),
      catchError((error) => {
        this.logout();
        return throwError(error)
      })
    );
  }
  updateToken = (data: TokenResponse) => {
    this.token = data.access_token;
    this.refreshToken = data.refresh_token;
    this.cookieService.set('access_token', this.token);
    this.cookieService.set('refresh_token', this.refreshToken);
  };
}

