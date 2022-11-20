import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { TextInputComponent } from './components/forms/text-input/text-input.component';
import { UiCommonComponent } from './ui-common.component';



@NgModule({
  declarations: [
    UiCommonComponent
  ],
  imports: [
  ],
  exports: [
    UiCommonComponent,
    ComponentsModule
  ]
})
export class UiCommonModule { }
