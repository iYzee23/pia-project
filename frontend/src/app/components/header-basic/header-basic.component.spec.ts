import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBasicComponent } from './header-basic.component';

describe('HeaderBasicComponent', () => {
  let component: HeaderBasicComponent;
  let fixture: ComponentFixture<HeaderBasicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderBasicComponent]
    });
    fixture = TestBed.createComponent(HeaderBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
