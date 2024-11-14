import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../interfaces/profile.interface';
import {PagebleInterface} from '../../data/interfaces/pageble.interface';
import {map} from 'rxjs';

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
  getMyProfile() {
    return this.http.get<Profile>(`${this.baseURL}account/me`);
  }
  getSubscribersShortList() {
    return this.http.get<PagebleInterface<Profile>>(`${this.baseURL}account/subscribers/`)
      .pipe(
        map( res => res.items.slice(0, 3))
      );
  }
}
