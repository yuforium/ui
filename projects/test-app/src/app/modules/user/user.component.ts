import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActorDto, NoteCreateDto } from "projects/ui-common/src/lib/api";
import { UserService } from "projects/ui-common/src/lib/api/api/user.service";
import { PersonDto } from "projects/ui-common/src/lib/api/model/personDto";
import { BehaviorSubject, Observable, map, shareReplay } from "rxjs";
import { AppService } from "../../app.service";
import { Editor } from "ngx-editor";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit, OnDestroy {
  public user: PersonDto | null = null;
  public handle: string = "";
  public readonly user$ = new BehaviorSubject<PersonDto | ActorDto | null>(null);
  public posts$: Observable<any> | undefined;
  public skip: number = 0;
  public limit: number = 10;
  public isPosting = false;
  public isLoading = false;
  public canPost = false;
  public editor!: Editor;
  public html = '';
  public totalItems: number = 0;
  public readonly totalItemsMap = {
    '=0': "No posts",
    '=1': "1 post",
    other: "# posts"
  }
  public pagination: {current: boolean, page: number}[] = [];

  constructor(
    private route: ActivatedRoute,
    protected userService: UserService,
    protected appService: AppService,
  ) {}

  ngOnInit(): void {
    this.editor = new Editor();

    this.route.data.subscribe(({user}) => {
      this.user$.next(user);
      this.loadContent();
    });

    // this.route.params.subscribe((params: any) => {
    //   this.username = params.username;
    //   this.loadContent();
    // });

    this.appService.user$.subscribe((user) => {
      if (user?.preferredUsername === this.appService.user$.getValue()?.preferredUsername) {
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
    const username = this.user$.getValue()?.preferredUsername;

    if (!username) {
      return;
    }

    this.isLoading = true;
    this.posts$ = this.userService.getContent(username, {
      type: "Note",
      skip: this.skip,
      limit: this.limit,
      sort: "-published",
    }).pipe(
      map(response => {
        this.totalItems = response.totalItems;
        this.isLoading = false;
        return response.items;
      }),
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

    const username = this.appService.user$.getValue()?.preferredUsername;

    if (!username) {
      return;
    }

    this.userService
      .postUserOutbox(username, data)
      .subscribe((_response) => {
        this.html = '';
        this.isPosting = false;
        this.loadContent();
      });
  }
}
