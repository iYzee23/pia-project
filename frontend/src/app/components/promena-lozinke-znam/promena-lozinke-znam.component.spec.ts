import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaLozinkeZnamComponent } from './promena-lozinke-znam.component';

describe('PromenaLozinkeZnamComponent', () => {
  let component: PromenaLozinkeZnamComponent;
  let fixture: ComponentFixture<PromenaLozinkeZnamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaLozinkeZnamComponent]
    });
    fixture = TestBed.createComponent(PromenaLozinkeZnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
