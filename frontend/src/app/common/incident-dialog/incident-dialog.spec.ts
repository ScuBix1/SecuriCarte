import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDialog } from './incident-dialog';

describe('IncidentDialog', () => {
  let component: IncidentDialog;
  let fixture: ComponentFixture<IncidentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
