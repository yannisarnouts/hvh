import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalistCmsComponent } from './finalist-cms.component';

describe('FinalistCmsComponent', () => {
  let component: FinalistCmsComponent;
  let fixture: ComponentFixture<FinalistCmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalistCmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalistCmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
