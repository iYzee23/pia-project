import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaUceniciComponent } from './registracija-ucenici.component';

describe('RegistracijaUceniciComponent', () => {
  let component: RegistracijaUceniciComponent;
  let fixture: ComponentFixture<RegistracijaUceniciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistracijaUceniciComponent]
    });
    fixture = TestBed.createComponent(RegistracijaUceniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
