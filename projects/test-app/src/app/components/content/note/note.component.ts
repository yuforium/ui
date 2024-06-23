import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActorDto, NoteCreateDto, ObjectDtoAttributedTo, UserService } from "projects/ui-common/src/lib/api";
import { AppService } from "../../../app.service";
import { IsArrayPipe } from "../../../pipes/is-array.pipe";
import { ToArrayPipe } from "../../../pipes/to-array.pipe";
import { RouterModule } from "@angular/router";

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

  public isPosting = false;

  constructor(protected appService: AppService, protected userService: UserService) { }

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

    const user = this.appService.user$.getValue();

    console.log('the data is ', data)
    // if (user && false) {
    //   this.userService.postUserOutbox(user.preferredUsername, data)
    //     .subscribe((_response) => {
    //       this.isPosting = false;
    //     });
    // }

    this.isPosting = false;
  }
}
