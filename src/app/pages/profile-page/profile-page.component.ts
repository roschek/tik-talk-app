import {Component, inject} from '@angular/core';
import {ProfileHeaderComponent} from '../../common-ui/profile-header/profile-header.component';
import {ProfileService} from '../../data/services/profile.service';
import {firstValueFrom, Observable, switchMap} from 'rxjs';
import {Profile} from '../../data/interfaces/profile.interface';
import {ActivatedRoute} from '@angular/router';
import {toObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  me$ = toObservable(this.profileService.me);
  subscribers$ = toObservable(this.profileService.subscribers);
  profile$ = this.route.params.pipe(
    switchMap(({id}) => {
      if (id === 'me') return this.me$;
      return this.profileService.getAccountById(id);
    })
  )
}
