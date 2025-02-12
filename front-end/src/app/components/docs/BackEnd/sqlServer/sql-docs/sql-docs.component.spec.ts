import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlDocsComponent } from './sql-docs.component';

describe('SqlDocsComponent', () => {
  let component: SqlDocsComponent;
  let fixture: ComponentFixture<SqlDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SqlDocsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SqlDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
