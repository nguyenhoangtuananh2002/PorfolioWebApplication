import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentUpdateComponentComponent } from './department-update-component.component';

describe('DepartmentUpdateComponentComponent', () => {
  let component: DepartmentUpdateComponentComponent;
  let fixture: ComponentFixture<DepartmentUpdateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentUpdateComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentUpdateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
