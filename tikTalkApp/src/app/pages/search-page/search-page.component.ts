import {Component, inject} from '@angular/core';
import {ProfileCardComponent} from '../../common-ui/profile-card/profile-card.component';
import {ProfileService} from '../../data/services/profile.service';
import {Profile} from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  profileService = inject(ProfileService)
  profiles: Profile[] =[];
  constructor(){
    this.profileService.getTestAccounts().subscribe((data: Profile[]) => this.profiles = data);
  }
}
