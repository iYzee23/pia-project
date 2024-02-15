import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDetaljiComponent } from './admin-detalji.component';

describe('AdminDetaljiComponent', () => {
  let component: AdminDetaljiComponent;
  let fixture: ComponentFixture<AdminDetaljiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDetaljiComponent]
    });
    fixture = TestBed.createComponent(AdminDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
