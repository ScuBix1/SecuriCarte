import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import formatDateToDDMMYYYY from '../../helpers/formatDateToDDMMYYYY';
import { Incident } from '../../models/incident.model';

@Component({
  selector: 'app-incident-dialog',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './incident-dialog.html',
  styleUrl: './incident-dialog.scss',
})
export class IncidentDialog {
  date: string;
  incident: Incident;
  isOwner: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    data: { incident: Incident; isOwner: boolean },
    private dialogRef: MatDialogRef<IncidentDialog>
  ) {
    this.incident = data.incident;
    this.isOwner = data.isOwner;
    this.date = formatDateToDDMMYYYY(data.incident.date);
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

  close() {
    this.dialogRef.close();
  }
}
