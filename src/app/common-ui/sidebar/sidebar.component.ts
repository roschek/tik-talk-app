import {Component, inject} from '@angular/core';
import {MenuItem} from './sidebar.interfaces';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {SubscriberCardComponent} from './subscriber-card/subscriber-card.component';
import {RouterLink} from '@angular/router';
import {ProfileService} from '../../data/services/profile.service';
import {Profile} from '../../data/interfaces/profile.interface';
import {PagebleInterface} from '../../data/interfaces/pageble.interface';
import {AsyncPipe} from '@angular/common';
import {firstValueFrom, Observable} from 'rxjs';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImgUrlPipe,
    ImgUrlPipe
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {icon: 'home', label: 'Home', path: '/profile/me'},
    {icon: 'chat', label: 'Chats'},
    {icon: 'search', label: 'Search', path: '/'}];
  profileService = inject(ProfileService);
  subscribers$: Observable<Profile[]> = this.profileService.getSubscribersShortList();
  myProfile$: Profile | null = null;
  ngOnInit() {
    firstValueFrom(this.profileService.getMyProfile()).then((data: Profile) => this.myProfile$ = data);
  }
}
