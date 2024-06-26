import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { APP_ROUTES } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Configuration, ConfigurationParameters, ApiModule } from 'projects/yuforium-ui-common/src/lib/api';
import { AppService } from './app/app.service';

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

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, ApiModule.forRoot(apiConfigFactory), FormsModule),
    AppService,
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(APP_ROUTES)
  ]
})
  .catch(err => console.error(err));
