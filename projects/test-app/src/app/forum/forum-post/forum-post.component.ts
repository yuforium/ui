import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumService } from 'projects/ui-common/src/lib/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forum-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.css']
})
export class ForumPostComponent {
  public forumId: string = '';
  public loading: boolean = false;

  constructor(
    protected forumService: ForumService,
    protected router: Router,
    protected route: ActivatedRoute
  ) {
    this.route.parent?.params.subscribe(params => {
      this.forumId = params['forumId'];
    });
  }

  public post(name: string, content: string, addressee?: string) {
    console.log('Post Message', name, content, addressee);
    const to = addressee || 'https://www.w3.org/ns/activitystreams#Public';

    const data: any = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      type: content.length > 500 ? 'Article' : 'Note',
      to,
      content,
      name
    };

    this.loading = true;
    this.forumService.postOutbox(this.forumId, data)
      .subscribe({
        next: response => this.onPostComplete(),
        error: err => this.onPostError(err)
      });
  }

  protected onPostComplete() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  protected onPostError(err: any) {
    // handle error
  }
}
