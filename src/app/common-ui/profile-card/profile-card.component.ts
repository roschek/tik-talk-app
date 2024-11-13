import {Component, Input} from '@angular/core';
import {Profile} from '../../data/interfaces/profile.interface';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    ImgUrlPipe,
    ImgUrlPipe
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {
@Input() profile!: Profile;
}
