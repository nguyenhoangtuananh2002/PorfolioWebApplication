import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmenIndexComponentComponent } from './departmen-index-component.component';

describe('DepartmenIndexComponentComponent', () => {
  let component: DepartmenIndexComponentComponent;
  let fixture: ComponentFixture<DepartmenIndexComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmenIndexComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmenIndexComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
