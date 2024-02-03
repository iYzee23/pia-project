import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcenikKomentarComponent } from './ucenik-komentar.component';

describe('UcenikKomentarComponent', () => {
  let component: UcenikKomentarComponent;
  let fixture: ComponentFixture<UcenikKomentarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UcenikKomentarComponent]
    });
    fixture = TestBed.createComponent(UcenikKomentarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
