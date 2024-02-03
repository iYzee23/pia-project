import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcenikDrugaComponent } from './ucenik-druga.component';

describe('UcenikDrugaComponent', () => {
  let component: UcenikDrugaComponent;
  let fixture: ComponentFixture<UcenikDrugaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UcenikDrugaComponent]
    });
    fixture = TestBed.createComponent(UcenikDrugaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
