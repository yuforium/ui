import { Injectable } from '@angular/core';
import { AuthService, Configuration } from './api';

export interface StoredApiToken {
  accessToken: string;
  expiresAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  protected storedApiToken: StoredApiToken|null = null;

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
      }
    }
  }

  public get authenticated(): boolean {
    const now = new Date();
    return this.storedApiToken !== null && now < this.storedApiToken.expiresAt;
  }

  setApiToken(storedApiToken: StoredApiToken) {
    localStorage.setItem('apiToken', JSON.stringify(storedApiToken));
  }
}
