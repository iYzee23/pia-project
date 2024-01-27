import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaLozinkeNeZnam2Component } from './promena-lozinke-ne-znam2.component';

describe('PromenaLozinkeNeZnam2Component', () => {
  let component: PromenaLozinkeNeZnam2Component;
  let fixture: ComponentFixture<PromenaLozinkeNeZnam2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaLozinkeNeZnam2Component]
    });
    fixture = TestBed.createComponent(PromenaLozinkeNeZnam2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
