import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { NoteComponent } from '../../components/content/note/note.component';
import { NgxEditorModule } from 'ngx-editor';
import { FormsModule } from '@angular/forms';
import { ActorHeaderComponent } from '../../components/content/actor-header/actor-header.component';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NoteComponent,
    NgxEditorModule,
    FormsModule,
    ActorHeaderComponent
  ]
})
export class UserModule { }
