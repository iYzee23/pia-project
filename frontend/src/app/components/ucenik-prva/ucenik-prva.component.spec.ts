import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcenikPrvaComponent } from './ucenik-prva.component';

describe('UcenikPrvaComponent', () => {
  let component: UcenikPrvaComponent;
  let fixture: ComponentFixture<UcenikPrvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UcenikPrvaComponent]
    });
    fixture = TestBed.createComponent(UcenikPrvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
