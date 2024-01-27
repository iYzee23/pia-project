import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaNastavnici2Component } from './registracija-nastavnici2.component';

describe('RegistracijaNastavnici2Component', () => {
  let component: RegistracijaNastavnici2Component;
  let fixture: ComponentFixture<RegistracijaNastavnici2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistracijaNastavnici2Component]
    });
    fixture = TestBed.createComponent(RegistracijaNastavnici2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
