import {Component, Input} from '@angular/core';
import {Profile} from '../../data/interfaces/profile.interface';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [
    AsyncPipe,
    ImgUrlPipe,
    RouterLink
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css'
})
export class ProfileHeaderComponent {
  @Input() profile$!: Observable<Profile | null>;
  @Input() subscribers$!: Observable<Profile[] | null>;
}
