import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ActorDto, ForumService, PersonDto } from 'projects/ui-common/src/lib/api';
import { BehaviorSubject } from 'rxjs';
import { ActorHeaderComponent } from '../components/content/actor-header/actor-header.component';
import { ActorToolbarComponent } from '../components/content/actor-toolbar/actor-toolbar.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, RouterModule, ActorHeaderComponent, ActorToolbarComponent],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  forum: ActorDto | null = null;
  public readonly forum$ = new BehaviorSubject<ActorDto | PersonDto | null>(null);

  constructor(
    protected route: ActivatedRoute,
    protected forumService: ForumService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.forum$.next(data['forum']);
    });
  }

  loadForum() {
  }
}
