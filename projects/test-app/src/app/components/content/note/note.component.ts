import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActorDto, ForumService, NoteCreateDto, ObjectDto, ObjectDtoAttributedTo, UserService } from "projects/ui-common/src/lib/api";
import { AppService } from "../../../app.service";
import { IsArrayPipe } from "../../../pipes/is-array.pipe";
import { ToArrayPipe } from "../../../pipes/to-array.pipe";
import { RouterModule } from "@angular/router";
import { Subject } from "rxjs";

@Component({
  selector: "app-note",
  standalone: true,
  imports: [CommonModule, RouterModule, IsArrayPipe, ToArrayPipe],
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.css"],
})
export class NoteComponent {
  @Input() public post!: any;
  @Input() public displayAuthor: boolean = true;
  @Input() public excludeAuthors?: string | string[];
  @Output() public onReply = new EventEmitter<{reply: NoteCreateDto, result$: Subject<boolean>}>();

  public isPosting = false;

  constructor(
    protected appService: AppService,
    protected userService: UserService,
    protected forumService: ForumService
  ) { }

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  public get authors(): ActorDto[] {
    if (!this.post.attributedTo) {
      return [];
    }

    const attributedTo = Array.isArray(this.post.attributedTo) ? this.post.attributedTo : [this.post.attributedTo];
    const excludeAuthors = this.excludeAuthors ? (Array.isArray(this.excludeAuthors) ? this.excludeAuthors : [this.excludeAuthors]) : [];
    const excluded = attributedTo.filter((author: ActorDto) => !excludeAuthors.includes(author.id));

    return excluded;
  }

  getAuthor(attributedTo: string | string[] | ObjectDtoAttributedTo): string {
    const author: string = Array.isArray(attributedTo)
      ? attributedTo[0]
      : attributedTo;

    return author;
  }

  getAuthorName() {

  }

  isString(value: any): boolean {
    return typeof value === "string";
  }

  isPerson(value: any): boolean {
    return value.type === 'Person';
  }

  typeOf(value: any): string | undefined {
    if (typeof value === 'object') {
      return value.type;
    }

    return undefined;
  }

  postReply(replyText: string) {
    const attributedTo = this.post.attributedTo;

    const data: NoteCreateDto = {
      type: "Note",
      content: replyText,
      inReplyTo: this.post.id,
      to: Array.isArray(attributedTo) || typeof attributedTo === 'string' ? attributedTo : attributedTo.id
    }

    data.to = Array.isArray(data.to) ? data.to : [data.to];
    data.to.push('https://www.w3.org/ns/activitystreams#Public');

    data.to = data.to.map((to: string | ObjectDto) => {
      if (typeof to === 'string') {
        return to;
      }
      return to.id;
    });

    const result$ = new Subject<boolean>();
    this.onReply.emit({reply: data, result$: result$});

    result$.subscribe((success) => {
      if (success) {
        this.isPosting = false;
      }
      else {
        this.isPosting = false;
      }
    });
  }
}
