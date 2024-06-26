import { AfterViewInit, Component, Signal, ViewChild } from '@angular/core';
import { AppService } from './app.service';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { PersonDto } from 'projects/yuforium-ui-common/src/lib/api';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';
import { HlmButtonModule } from '../../../spartan-ui/ui-button-helm/src';
import { BrnMenuModule } from '@spartan-ng/ui-menu-brain';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { CdkMenuTrigger } from '@angular/cdk/menu';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [
      RouterOutlet,
      RouterLink,
      NgIf,
      AsyncPipe,
      HlmButtonModule,
      BrnMenuModule,
      HlmMenuModule
    ]
})
export class AppComponent implements AfterViewInit {
  // this doesn't work if the user is not logged in and the menu button not visible
  @ViewChild(CdkMenuTrigger) trigger!: CdkMenuTrigger;
  public readonly title;
  public user!: Signal<PersonDto | null>;
  public user$!: BehaviorSubject<PersonDto | null>
  public menuOpen = false;

  constructor(readonly appService: AppService, readonly titleService: Title, protected router: Router) {
    this.title = appService.title;
    this.titleService.setTitle(this.title);
    this.user$ = this.appService.user$;
    this.user = this.appService.user;
  }

  ngAfterViewInit(): void {
    this.trigger.opened.subscribe(() => {
      this.menuOpen = true;
    });
    this.trigger.closed.subscribe(() => {
      this.menuOpen = false;
    });
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
