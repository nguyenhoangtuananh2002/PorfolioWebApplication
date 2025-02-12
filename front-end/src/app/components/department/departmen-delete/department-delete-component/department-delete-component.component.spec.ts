import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentDeleteComponentComponent } from './department-delete-component.component';

describe('DepartmentDeleteComponentComponent', () => {
  let component: DepartmentDeleteComponentComponent;
  let fixture: ComponentFixture<DepartmentDeleteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentDeleteComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmentDeleteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
