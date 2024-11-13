import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
http = inject(HttpClient);
baseURL = 'https://icherniakov.ru/yt-course/';
  constructor() { }
  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseURL}account/test_accounts`);
  }
}
