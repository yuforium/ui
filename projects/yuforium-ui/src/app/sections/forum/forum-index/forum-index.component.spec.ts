import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumIndexComponent } from './forum-index.component';

describe('ForumIndexComponent', () => {
  let component: ForumIndexComponent;
  let fixture: ComponentFixture<ForumIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ForumIndexComponent]
    });
    fixture = TestBed.createComponent(ForumIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
