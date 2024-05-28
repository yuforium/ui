import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ApiModule, Configuration, ConfigurationParameters } from 'projects/ui-common/src/lib/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppService } from './app.service';
import { AboutComponent } from './about/about.component';

const apiConfigFactory = (): Configuration => {
  const params: ConfigurationParameters = {};
  if (environment.apiBasePath) {
    params.basePath = environment.apiBasePath;
  }
  else {
    const sld = AppService.sld;
    params.basePath = `http${ sld !== 'localhost:3000' ? 's' : ''}://${sld}`;
  }

  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ApiModule.forRoot(apiConfigFactory),
    FormsModule
  ],
  providers: [
    AppService,
    provideHttpClient(withInterceptorsFromDi())
  ]}
)
export class AppModule { }
