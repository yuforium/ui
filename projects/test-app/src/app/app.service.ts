import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService, Configuration, PersonDto } from 'projects/ui-common/src/lib/api';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';

export interface StoredApiToken {
  accessToken: string;
  expiresAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public readonly $user = new BehaviorSubject<PersonDto | null>(null);
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
          this.$user.next(profile);
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

  login(username: string, password: string): Observable<any> {
    return this.authService.login({username, password})
      .pipe(
        switchMap(response => {
          const expiresAt = new Date();
          expiresAt.setSeconds(expiresAt.getSeconds() + response.expires_in);

          this.setApiToken({accessToken: response.access_token, expiresAt});
          this.config.credentials['bearer'] = response.access_token;

          return this.authService.profile();
        }),
        map((profile: PersonDto) => {
          this.$user.next(profile);
          return profile;
        })
      );
  }

  logout(): void {
    this.storedApiToken = null;
    localStorage.removeItem('apiToken');
    this.config.credentials['bearer'] = () => undefined;
    this.$user.next(null);
  }
}
