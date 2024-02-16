import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNeregistrovaniComponent } from './header-neregistrovani.component';

describe('HeaderNeregistrovaniComponent', () => {
  let component: HeaderNeregistrovaniComponent;
  let fixture: ComponentFixture<HeaderNeregistrovaniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderNeregistrovaniComponent]
    });
    fixture = TestBed.createComponent(HeaderNeregistrovaniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
