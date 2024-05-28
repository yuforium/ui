import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { NoteComponent } from '../../components/content/note/note.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NoteComponent,
    NgxEditorModule,
    FormsModule
  ]
})
export class UserModule { }
