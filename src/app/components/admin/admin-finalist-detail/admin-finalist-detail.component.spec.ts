import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinalistDetailComponent } from './admin-finalist-detail.component';

describe('AdminFinalistDetailComponent', () => {
  let component: AdminFinalistDetailComponent;
  let fixture: ComponentFixture<AdminFinalistDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinalistDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinalistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
