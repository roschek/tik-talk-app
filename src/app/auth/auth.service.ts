import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  baseURL = 'https://icherniakov.ru/yt-course/auth/';
  login(payload: {username: string, password: string}) {
    const fd = new FormData();
    fd.append('username', payload.username.trim());
    fd.append('password', payload.password.trim());
    return this.http.post(`${this.baseURL}token`, fd);
  }
}
