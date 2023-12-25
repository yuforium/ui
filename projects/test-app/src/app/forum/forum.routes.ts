import { Route } from "@angular/router";
import { ForumComponent } from "./forum.component";
import { ForumPostComponent } from "./forum-post/forum-post.component";
import { ForumIndexComponent } from "./forum-index/forum-index.component";

export const FORUM_ROUTES: Route[] = [
  {
    path: ':forumId', 
    component: ForumComponent,
    children: [
      {
        path: '',
        component: ForumIndexComponent
      },
      {
        path: 'post',
        component: ForumPostComponent
      }
    ]
  }
]