import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPredmetiComponent } from './admin-predmeti.component';

describe('AdminPredmetiComponent', () => {
  let component: AdminPredmetiComponent;
  let fixture: ComponentFixture<AdminPredmetiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPredmetiComponent]
    });
    fixture = TestBed.createComponent(AdminPredmetiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
