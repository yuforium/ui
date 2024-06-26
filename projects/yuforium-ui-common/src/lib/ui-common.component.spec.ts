import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCommonComponent } from './ui-common.component';

describe('UiCommonComponent', () => {
  let component: UiCommonComponent;
  let fixture: ComponentFixture<UiCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UiCommonComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
