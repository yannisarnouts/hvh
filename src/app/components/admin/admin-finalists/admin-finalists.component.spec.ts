import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinalistsComponent } from './admin-finalists.component';

describe('AdminFinalistsComponent', () => {
  let component: AdminFinalistsComponent;
  let fixture: ComponentFixture<AdminFinalistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinalistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinalistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
