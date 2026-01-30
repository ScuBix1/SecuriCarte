import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentModal } from './incident-modal';

describe('IncidentModal', () => {
  let component: IncidentModal;
  let fixture: ComponentFixture<IncidentModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentModal],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
