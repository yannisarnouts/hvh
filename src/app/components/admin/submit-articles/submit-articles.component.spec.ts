import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitArticlesComponent } from './submit-articles.component';

describe('SubmitArticlesComponent', () => {
  let component: SubmitArticlesComponent;
  let fixture: ComponentFixture<SubmitArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
