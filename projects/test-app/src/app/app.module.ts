import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ApiModule, Configuration, ConfigurationParameters } from 'projects/common/src/lib/api';
import { CommonModule } from 'projects/common/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { CommonService } from 'common';

const apiConfigFactory = (): Configuration => {
  const params: ConfigurationParameters = {
    basePath: environment.apiBasePath
  };

  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ApiModule.forRoot(apiConfigFactory),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
