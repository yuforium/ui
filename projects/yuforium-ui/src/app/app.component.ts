import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { PersonDto } from 'projects/yuforium-ui-common/src/lib/api';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [RouterOutlet, RouterLink, NgIf, AsyncPipe]
})
export class AppComponent {
  public readonly title;
  public $user!: BehaviorSubject<PersonDto | null>

  constructor(readonly appService: AppService, readonly titleService: Title, protected router: Router) {
    this.title = appService.title;
    this.titleService.setTitle(this.title);
    this.$user = this.appService.user$;
  }

  public logout(): void {
    this.appService.logout();
    this.router.navigate(['/']);
  }

  blurActiveElement() {
    const el = document.activeElement;
    if ((el as any)?.blur) {
      (el as any).blur();
    }
  }
}
