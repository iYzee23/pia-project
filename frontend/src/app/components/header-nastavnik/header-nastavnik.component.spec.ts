import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNastavnikComponent } from './header-nastavnik.component';

describe('HeaderNastavnikComponent', () => {
  let component: HeaderNastavnikComponent;
  let fixture: ComponentFixture<HeaderNastavnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderNastavnikComponent]
    });
    fixture = TestBed.createComponent(HeaderNastavnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
