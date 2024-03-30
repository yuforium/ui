import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ActivityStreams, Person } from "@yuforium/activity-streams";
import {
  ActivityPubService,
  NoteCreateDto,
} from "projects/ui-common/src/lib/api";
import { UserService } from "projects/ui-common/src/lib/api/api/user.service";
import { PersonDto } from "projects/ui-common/src/lib/api/model/personDto";
import { Observable, map, pluck, shareReplay, switchMap } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit {
  public username: string = "";
  public person: PersonDto | null = null;
  public activity: any[] = [];
  public posts$: Observable<any> | undefined;
  public skip: number = 0;
  public limit: number = 10;

  constructor(
    private route: ActivatedRoute,
    protected userService: UserService,
    protected activityPubService: ActivityPubService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.username = params.username;
      this.loadContent();
    });
  }

  loadContent() {
    this.posts$ = this.userService.get(this.username).pipe(
      switchMap((response) => {
        this.person = response;
        return this.userService.getContent(this.username, {
          type: "Note",
          skip: this.skip,
          limit: this.limit,
          sort: "-published",
        });
      }),
      map((response) => response.items.map(i => ActivityStreams.transform(i) as Person)),
      shareReplay(),
    );
  }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  postMessage(message: string, addressee?: string) {
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
      to = "https://www.w3.org/ns/activitystreams#Public";
    }

    const data: NoteCreateDto = {
      type: "Note",
      content: message,
      to: to,
      attributedTo: "", // populated by server
    };

    this.activityPubService
      .postUserOutbox(this.username, data)
      .subscribe((response) => {
        this.loadContent();
      });
  }
}
