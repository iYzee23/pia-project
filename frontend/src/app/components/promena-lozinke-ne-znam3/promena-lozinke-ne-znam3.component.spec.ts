import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaLozinkeNeZnam3Component } from './promena-lozinke-ne-znam3.component';

describe('PromenaLozinkeNeZnam3Component', () => {
  let component: PromenaLozinkeNeZnam3Component;
  let fixture: ComponentFixture<PromenaLozinkeNeZnam3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaLozinkeNeZnam3Component]
    });
    fixture = TestBed.createComponent(PromenaLozinkeNeZnam3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
