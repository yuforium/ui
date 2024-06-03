import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ForumService } from 'projects/ui-common/src/lib/api';
import { Observable, map, switchMap } from 'rxjs';
import { NoteComponent } from '../../components/content/note/note.component';

@Component({
  selector: 'app-forum-index',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NoteComponent
  ],
  templateUrl: './forum-index.component.html',
  styleUrls: ['./forum-index.component.css']
})
export class ForumIndexComponent {
  public forumname: string = '';
  public posts$: Observable<any> | undefined;

  constructor(
    private route: ActivatedRoute,
    protected forumService: ForumService,
  ) { }

  ngOnInit(): void {
    // this.route.params.subscribe((params: any) => {
    //   this.posts$ = this.forumService.getForumContent(params['forumId'])
    //     .pipe(
    //       map(response => response.items)
    //     );
    // });
  }

  loadContent() {
    // this.posts$ = this.forumService.getForumContent(this.forumname)
    //   .pipe(
    //     map(response => response.items)
    //   )
  }
}
