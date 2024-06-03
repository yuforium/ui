import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorHeaderComponent } from './actor-header.component';

describe('ActorHeaderComponent', () => {
  let component: ActorHeaderComponent;
  let fixture: ComponentFixture<ActorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActorHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
