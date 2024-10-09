import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AraSlideToggleComponent } from './ara-slide-toggle.component';

describe('AraSlideToggleComponent', () => {
  let component: AraSlideToggleComponent;
  let fixture: ComponentFixture<AraSlideToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AraSlideToggleComponent]
    });
    fixture = TestBed.createComponent(AraSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
