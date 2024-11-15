import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Profile} from '../interfaces/profile.interface';
import {PagebleInterface} from '../../data/interfaces/pageble.interface';
import {map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
http = inject(HttpClient);
baseURL = 'https://icherniakov.ru/yt-course/';
me = signal<Profile | null>(null);
subscribers = signal<Profile[] | null>(null);
  constructor() { }
  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseURL}account/test_accounts`);
  }
  getMyProfile() {
    return this.http.get<Profile>(`${this.baseURL}account/me`)
      .pipe(
        tap( res => this.me.set(res))
      );
  }
  getAccountById(id: string) {
    return this.http.get<Profile>(`${this.baseURL}account/${id}`);
  }
  getSubscribersShortList() {
    return this.http.get<PagebleInterface<Profile>>(`${this.baseURL}account/subscribers/`)
      .pipe(
        tap(res => this.subscribers.set(res.items)),
        map( res => res.items.slice(0, 3))
      );
  }
}
