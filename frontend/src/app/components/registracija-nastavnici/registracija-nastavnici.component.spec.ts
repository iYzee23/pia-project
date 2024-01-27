import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaNastavniciComponent } from './registracija-nastavnici.component';

describe('RegistracijaNastavniciComponent', () => {
  let component: RegistracijaNastavniciComponent;
  let fixture: ComponentFixture<RegistracijaNastavniciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistracijaNastavniciComponent]
    });
    fixture = TestBed.createComponent(RegistracijaNastavniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
