import { Component, Input } from '@angular/core';
import { ActorDto, PersonDto } from 'projects/yuforium-ui-common/src/lib/api';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-actor-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './actor-toolbar.component.html',
  styleUrl: './actor-toolbar.component.css'
})
export class ActorToolbarComponent {
  @Input('actor') actor$!: BehaviorSubject<ActorDto | PersonDto | null>;
}
