import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Incident } from '../../models/incident.model';

@Component({
  selector: 'app-incident-dialog',
  imports: [CommonModule],
  templateUrl: './incident-dialog.html',
})
export class IncidentDialog {
  incident: Incident;
  isOwner: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    data: { incident: Incident; isOwner: boolean },
    private dialogRef: MatDialogRef<IncidentDialog>
  ) {
    this.incident = data.incident;
    this.isOwner = data.isOwner;
  }

  edit() {
    this.dialogRef.close({
      action: 'edit',
      incident: this.incident,
    });
  }

  delete() {
    this.dialogRef.close({
      action: 'delete',
      incident: this.incident,
    });
  }
}
