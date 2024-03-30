import { Component, OnInit } from '@angular/core';
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
export class ForumComponent implements OnInit {
  forum: any;

  constructor(
    protected route: ActivatedRoute,
    protected forumService: ForumService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.forumService.getForum(params['forumId']).subscribe(forum => {
        this.forum = forum;
      });
    });
  }

  loadForum() {
    this.forumService.getForum(this.forum.id).subscribe(forum => {
      this.forum = forum;
    });
  }
}
