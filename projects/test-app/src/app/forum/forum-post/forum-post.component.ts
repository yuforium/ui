import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityPubService } from 'projects/ui-common/src/lib/api/api/activityPub.service';
import { ForumService } from 'projects/ui-common/src/lib/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forum-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.css']
})
export class ForumPostComponent {
  public forumId: string = '';

  constructor(
    protected forumService: ForumService,
    protected route: ActivatedRoute
  ) {
    this.route.parent?.params.subscribe(params => {
      this.forumId = params['forumId'];
    });
  }

  public post(title: string, content: string, addressee?: string) {
    console.log('Post Message', title, content, addressee);

    console.log('this is a test');
    const to = addressee || 'https://www.w3.org/ns/activitystreams#Public';

    const data: any = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      type: 'Note',
      to,
      content
    };

    console.log('no network request made?');
    this.forumService.postOutbox(this.forumId, data).subscribe((response: any) => {
      console.log('response', response);
    });
  }
}
