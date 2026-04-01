import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EessComponent } from './eess.component';

describe('EessComponent', () => {
  let component: EessComponent;
  let fixture: ComponentFixture<EessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EessComponent]
    });
    fixture = TestBed.createComponent(EessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
