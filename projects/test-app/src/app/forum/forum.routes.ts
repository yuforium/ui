import { Route } from "@angular/router";
import { ForumComponent } from "./forum.component";
import { ForumPostComponent } from "./forum-post/forum-post.component";
import { ForumIndexComponent } from "./forum-index/forum-index.component";
import { forumResolver } from "../resolvers/forum.resolver";

export const FORUM_ROUTES: Route[] = [
  {
    path: ':forumname',
    component: ForumComponent,
    resolve: {
      forum: forumResolver
    },
    // runGuardsAndResolvers: 'always',
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
