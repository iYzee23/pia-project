import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcenikKomentarDodatnoComponent } from './ucenik-komentar-dodatno.component';

describe('UcenikKomentarDodatnoComponent', () => {
  let component: UcenikKomentarDodatnoComponent;
  let fixture: ComponentFixture<UcenikKomentarDodatnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UcenikKomentarDodatnoComponent]
    });
    fixture = TestBed.createComponent(UcenikKomentarDodatnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
