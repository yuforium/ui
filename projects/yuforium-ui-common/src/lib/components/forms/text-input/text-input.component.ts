import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'yf-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.css'],
    standalone: true,
    imports: [NgIf]
})
export class TextInputComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() inputType: 'text' | 'password' = 'text';
  @ViewChild('input', {static: true}) input!: ElementRef;

  static _uniqueId: number = 0;
  static uniqueId() {
    return `yf-text-input-${TextInputComponent._uniqueId++}`;
  }

  id: string = TextInputComponent.uniqueId();

  constructor() { }

  ngOnInit(): void {
    // this.value.emit('value');
  }

  get value(): string {
    return this.input.nativeElement.value || '';
  }

  // @Output() value: EventEmitter<string> = new EventEmitter<string>();
}
