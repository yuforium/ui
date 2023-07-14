import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ApiModule, Configuration, ConfigurationParameters } from 'projects/ui-common/src/lib/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppService } from './app.service';

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
    AppRoutingModule,
    BrowserModule,
    ApiModule.forRoot(apiConfigFactory),
    HttpClientModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
