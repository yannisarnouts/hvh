import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitContentComponent } from './submit-content.component';

describe('SubmitContentComponent', () => {
  let component: SubmitContentComponent;
  let fixture: ComponentFixture<SubmitContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
