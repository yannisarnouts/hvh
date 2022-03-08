import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitFinalistComponent } from './submit-finalist.component';

describe('SubmitFinalistComponent', () => {
  let component: SubmitFinalistComponent;
  let fixture: ComponentFixture<SubmitFinalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitFinalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitFinalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
