import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectDto } from 'projects/ui-common/src/lib/api';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input() public post!: ObjectDto;

  isArray(value: any): boolean {    
    return Array.isArray(value);
  }
}
