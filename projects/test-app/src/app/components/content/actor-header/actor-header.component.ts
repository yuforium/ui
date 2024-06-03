import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActorDto, PersonDto } from 'projects/ui-common/src/lib/api';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-actor-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './actor-header.component.html',
  styleUrl: './actor-header.component.css'
})
export class ActorHeaderComponent implements OnInit {
  @Input('actor') actor$!: BehaviorSubject<ActorDto | PersonDto | null>;
  public handle: string = '';

  ngOnInit(): void {
    this.actor$.subscribe((actor) => {
      if (actor) {
        const url = new URL(actor.id);
        this.handle = `@${actor.preferredUsername}@${url.hostname}`;
      }
      else {
        this.handle = '';
      }
    });
  }
}
