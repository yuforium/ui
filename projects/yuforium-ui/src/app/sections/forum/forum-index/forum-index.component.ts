import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ActorDto, ForumService, NoteCreateDto } from 'projects/yuforium-ui-common/src/lib/api';
import { BehaviorSubject, Observable, Subject, finalize, map } from 'rxjs';
import { NoteComponent } from '../../../components/content/note/note.component';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmIconModule, provideIcons } from '@spartan-ng/ui-icon-helm';
import { lucideFilePlus } from '@ng-icons/lucide';
import { HlmCardModule } from '@spartan-ng/ui-card-helm';

@Component({
  selector: 'app-forum-index',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NoteComponent,
    FormsModule,
    NgxEditorModule,
    HlmButtonModule,
    HlmIconModule,
    HlmCardModule
  ],
  providers: [provideIcons({lucideFilePlus})],
  templateUrl: './forum-index.component.html',
  styleUrls: ['./forum-index.component.css']
})
export class ForumIndexComponent {
  public forumname: string = '';
  public forum$: BehaviorSubject<ActorDto | null> = new BehaviorSubject<ActorDto | null>(null);
  public posts$: Observable<any> | undefined;
  public isPosting: boolean = false;
  public canPost: boolean = true;
  public editor = new Editor();
  public html: string = '';
  public name: string = '';

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    protected forumService: ForumService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.forumname = params['forumname'];
      this.loadContent();
    });

    this.route.data.subscribe(data => {
      this.forum$.next(data['forum']);
    })

    // this.route.params.subscribe((params: any) => {
    //   this.posts$ = this.forumService.getForumContent(params['forumId'])
    //     .pipe(
    //       map(response => response.items)
    //     );
    // });
  }

  /**
   * Post a message to the forum.
   */
  public postMessage(addressee?: string) {
    const to = addressee || 'https://www.w3.org/ns/activitystreams#Public';

    const data: any = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      type: 'Note',
      to,
      content: this.html,
      name: this.name
    };

    this.forumService.postForumOutbox(this.forumname, data)
      .pipe(
        finalize(() => this.isPosting = false)
      )
      .subscribe({
        next: _response => this.onPostComplete(),
        error: err => this.onPostError(err)
      });
  }

  protected onPostComplete() {
    this.loadContent();
    // this.isPosting = false;
    // this.router.navigate(['..'], {relativeTo: this.route});
  }

  protected onPostError(_err: any) {
    // handle error
  }

  loadContent() {
    this.posts$ = this.forumService.getForumContent(this.forumname)
      .pipe(
        map(response => response.items)
      )
  }

  onReply({reply, result$}: {reply: NoteCreateDto, result$: Subject<boolean>}) {
    this.forumService.postForumOutbox(this.forumname, reply)
      .subscribe({
        next: _response => {
          result$.next(true);
          this.loadContent();
        },
        error: err => {
          result$.error(err);
        }
      });
  }

  onContentClick(event: any) {
  }
}
