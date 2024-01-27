import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaLozinkeNeZnam1Component } from './promena-lozinke-ne-znam1.component';

describe('PromenaLozinkeNeZnam1Component', () => {
  let component: PromenaLozinkeNeZnam1Component;
  let fixture: ComponentFixture<PromenaLozinkeNeZnam1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaLozinkeNeZnam1Component]
    });
    fixture = TestBed.createComponent(PromenaLozinkeNeZnam1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
