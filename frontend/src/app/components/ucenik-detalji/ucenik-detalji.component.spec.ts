import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcenikDetaljiComponent } from './ucenik-detalji.component';

describe('UcenikDetaljiComponent', () => {
  let component: UcenikDetaljiComponent;
  let fixture: ComponentFixture<UcenikDetaljiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UcenikDetaljiComponent]
    });
    fixture = TestBed.createComponent(UcenikDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
