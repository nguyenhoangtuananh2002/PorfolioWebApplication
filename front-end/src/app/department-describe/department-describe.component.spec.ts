import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDescribeComponent } from './department-describe.component';

describe('DepartmentDescribeComponent', () => {
  let component: DepartmentDescribeComponent;
  let fixture: ComponentFixture<DepartmentDescribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentDescribeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentDescribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
