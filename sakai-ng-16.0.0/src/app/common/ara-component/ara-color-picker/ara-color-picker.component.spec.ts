import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AraColorPickerComponent } from './ara-color-picker.component';

describe('AraColorPickerComponent', () => {
  let component: AraColorPickerComponent;
  let fixture: ComponentFixture<AraColorPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AraColorPickerComponent]
    });
    fixture = TestBed.createComponent(AraColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
