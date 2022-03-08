import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinalistComponent } from './edit-finalist.component';

describe('EditFinalistComponent', () => {
  let component: EditFinalistComponent;
  let fixture: ComponentFixture<EditFinalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFinalistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFinalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
