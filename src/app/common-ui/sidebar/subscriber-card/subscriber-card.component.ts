import {Component, Input} from '@angular/core';
import {Profile} from '../../../data/interfaces/profile.interface';
import {ImgUrlPipe} from '../../../helpers/pipes/img-url.pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [
    ImgUrlPipe,
    ImgUrlPipe,
    ImgUrlPipe,
    RouterLink
  ],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.css'
})
export class SubscriberCardComponent {
 @Input() profile!: Profile;
}
