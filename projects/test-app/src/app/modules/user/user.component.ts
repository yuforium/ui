import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  ActivityPubService, NoteCreateDto
} from "projects/ui-common/src/lib/api";
import { UserService } from "projects/ui-common/src/lib/api/api/user.service";
import { PersonDto } from "projects/ui-common/src/lib/api/model/personDto";
import { Observable, map, shareReplay, switchMap } from "rxjs";
import { AppService } from "../../app.service";
import { Editor } from "ngx-editor";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit, OnDestroy {
  public username: string = "";
  public handle: string = "";
  public person: PersonDto | null = null;
  public activity: any[] = [];
  public posts$: Observable<any> | undefined;
  public skip: number = 0;
  public limit: number = 10;
  public isPosting = false;
  public userId: any;
  public canPost = false;
  public editor!: Editor;
  public html = '';

  constructor(
    private route: ActivatedRoute,
    protected userService: UserService,
    protected activityPubService: ActivityPubService,
    protected appService: AppService,
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();

    this.route.data.subscribe(({user}) => {
      this.username = user.preferredUsername;
      this.loadContent();
    });

    // this.route.params.subscribe((params: any) => {
    //   this.username = params.username;
    //   this.loadContent();
    // });

    this.appService.$user.subscribe((user) => {
      if (user?.preferredUsername === this.username) {
        this.canPost = true;
      }
      else {
        this.canPost = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  loadContent() {
    this.posts$ = this.userService.get(this.username).pipe(
      switchMap((response) => {
        this.person = response;
        const url = new URL(response.id);
        this.handle = `@${response.preferredUsername}@${url.hostname}`;
        return this.userService.getContent(this.username, {
          type: "Note",
          skip: this.skip,
          limit: this.limit,
          sort: "-published",
        });
      }),
      map((response) => response.items),
      shareReplay(),
    );
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  postMessage(addressee?: string) {
    /**
     * if to is not set, use followers link as "to:' field
     *
     * "to" field should be considered public unless otherwise specified
     * https://www.w3.org/ns/activitystreams#Public
     *
     */
    let to: string | string[];

    if (addressee) {
      to = [addressee, "https://www.w3.org/ns/activitystreams#Public"];
    } else {
      to = ["https://www.w3.org/ns/activitystreams#Public"];
    }

    const data: NoteCreateDto = {
      type: "Note",
      content: this.html,
      to: to,
      attributedTo: "", // populated by server, this could be an option in the future (e.g. posting as another user)
    };

    this.activityPubService
      .postUserOutbox(this.username, data)
      .subscribe((_response) => {
        this.html = '';
        this.isPosting = false;
        this.loadContent();
      });
  }
}
