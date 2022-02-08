import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalistsComponent } from './finalists.component';

describe('FinalistsComponent', () => {
  let component: FinalistsComponent;
  let fixture: ComponentFixture<FinalistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
