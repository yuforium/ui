import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorToolbarComponent } from './actor-toolbar.component';

describe('ActorToolbarComponent', () => {
  let component: ActorToolbarComponent;
  let fixture: ComponentFixture<ActorToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorToolbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActorToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
