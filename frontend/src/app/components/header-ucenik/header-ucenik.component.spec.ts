import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUcenikComponent } from './header-ucenik.component';

describe('HeaderUcenikComponent', () => {
  let component: HeaderUcenikComponent;
  let fixture: ComponentFixture<HeaderUcenikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderUcenikComponent]
    });
    fixture = TestBed.createComponent(HeaderUcenikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
