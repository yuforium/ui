import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ForumService } from 'projects/ui-common/src/lib/api';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  forum: any;

  constructor(
    protected route: ActivatedRoute, 
    protected ForumService: ForumService
  ) {
    this.route.params.subscribe(params => {
      console.log('id', params['forumId']);
      this.ForumService.getForum(params['forumId']).subscribe(forum => {
        console.log('forum', forum);
        this.forum = forum;
      });
    });
  }
}
