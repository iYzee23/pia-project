import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaLozinkePocetnaComponent } from './promena-lozinke-pocetna.component';

describe('PromenaLozinkePocetnaComponent', () => {
  let component: PromenaLozinkePocetnaComponent;
  let fixture: ComponentFixture<PromenaLozinkePocetnaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaLozinkePocetnaComponent]
    });
    fixture = TestBed.createComponent(PromenaLozinkePocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
