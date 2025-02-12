import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentCreateComponentComponent } from './department-create-component.component';

describe('DepartmentCreateComponentComponent', () => {
  let component: DepartmentCreateComponentComponent;
  let fixture: ComponentFixture<DepartmentCreateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentCreateComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentCreateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
