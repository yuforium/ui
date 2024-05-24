import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ObjectDto, ObjectDtoAttributedTo } from "projects/ui-common/src/lib/api";

@Component({
  selector: "app-note",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.css"],
})
export class NoteComponent {
  @Input() public post!: any;
  @Input() public displayAuthor: boolean = true;

  isArray(value: any): boolean {
    return Array.isArray(value);
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
}
