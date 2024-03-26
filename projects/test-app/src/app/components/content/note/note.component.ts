import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ObjectDto } from "projects/ui-common/src/lib/api";

@Component({
  selector: "app-note",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.css"],
})
export class NoteComponent {
  @Input() public post!: ObjectDto;

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  getAuthor(attributedTo: string | string[]): string {
    const author: string = Array.isArray(attributedTo)
      ? attributedTo[0]
      : attributedTo;

    return author;
  }

  isString(value: any): boolean {
    return typeof value === "string";
  }

  isObject(value: any): boolean {
    console.log(value.name);
    return false;
  }

  isPerson(value: any): boolean {
    return value.type === 'Person';
  }
}
