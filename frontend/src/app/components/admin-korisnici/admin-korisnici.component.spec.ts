import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKorisniciComponent } from './admin-korisnici.component';

describe('AdminKorisniciComponent', () => {
  let component: AdminKorisniciComponent;
  let fixture: ComponentFixture<AdminKorisniciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminKorisniciComponent]
    });
    fixture = TestBed.createComponent(AdminKorisniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
