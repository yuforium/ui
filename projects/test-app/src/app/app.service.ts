import { Injectable } from '@angular/core';
import { AuthService, Configuration, PersonDto } from 'projects/ui-common/src/lib/api';

export interface StoredApiToken {
  accessToken: string;
  expiresAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  protected storedApiToken: StoredApiToken | null = null;
  protected _profile: PersonDto | null = null;

  constructor(protected config: Configuration, protected authService: AuthService) {
    const t = localStorage.getItem('apiToken');

    if (t) {
      const storedApiToken = JSON.parse(t);
      storedApiToken.expiresAt = new Date(storedApiToken.expiresAt);

      const now = new Date();

      if (now > storedApiToken.expiresAt) {
        this.storedApiToken = null;
      }
      else {
        this.storedApiToken = storedApiToken;
        this.config.credentials['bearer'] = storedApiToken.accessToken;
        this.authService.profile().subscribe((profile: PersonDto) => {
          this._profile = profile;
        });
      }
    }
  }

  public get authenticated(): boolean {
    const now = new Date();
    return this.storedApiToken !== null && now < this.storedApiToken.expiresAt;
  }

  public get profile(): PersonDto | null {
    return this._profile;
  }

  setApiToken(storedApiToken: StoredApiToken) {
    localStorage.setItem('apiToken', JSON.stringify(storedApiToken));
  }
}
