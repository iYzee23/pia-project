import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaNastavnici1Component } from './registracija-nastavnici1.component';

describe('RegistracijaNastavnici1Component', () => {
  let component: RegistracijaNastavnici1Component;
  let fixture: ComponentFixture<RegistracijaNastavnici1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistracijaNastavnici1Component]
    });
    fixture = TestBed.createComponent(RegistracijaNastavnici1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
