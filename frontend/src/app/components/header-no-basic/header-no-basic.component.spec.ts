import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNoBasicComponent } from './header-no-basic.component';

describe('HeaderNoBasicComponent', () => {
  let component: HeaderNoBasicComponent;
  let fixture: ComponentFixture<HeaderNoBasicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderNoBasicComponent]
    });
    fixture = TestBed.createComponent(HeaderNoBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
