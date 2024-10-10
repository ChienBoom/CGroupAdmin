import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductDetailDialogComponent } from './add-product-detail-dialog.component';

describe('AddProductDetailDialogComponent', () => {
  let component: AddProductDetailDialogComponent;
  let fixture: ComponentFixture<AddProductDetailDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductDetailDialogComponent]
    });
    fixture = TestBed.createComponent(AddProductDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
