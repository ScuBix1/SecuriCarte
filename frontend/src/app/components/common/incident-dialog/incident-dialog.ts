import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule, MatLabel } from '@angular/material/input';
import formatDateToDDMMYYYY from '../../../helpers/formatDateToDDMMYYYY';
import { Incident, UpdateIncident } from '../../../models/incident.model';
import { AuthService } from '../../../services/auth.service';
import { IncidentService } from '../../../services/incident.service';

@Component({
  selector: 'app-incident-dialog',
  imports: [CommonModule, MatButtonModule, FormsModule, MatInputModule, MatLabel],
  templateUrl: './incident-dialog.html',
  styleUrl: './incident-dialog.scss',
})
export class IncidentDialog {
  date: string;
  incident: Incident;
  isOwner: boolean = false;
  isEditing: boolean;
  editedTitle: string;
  editedDescription: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    data: { incident: Incident; user_id: string },
    private dialogRef: MatDialogRef<IncidentDialog>,
    private incidentService: IncidentService,
    private authService: AuthService
  ) {
    this.incident = data.incident;
    this.date = formatDateToDDMMYYYY(data.incident.date);
    this.isEditing = false;
    this.editedTitle = '';
    this.editedDescription = '';
    this.authService.getCurrentUser().subscribe((response) => {
      if (response.loggedIn && response.user?.id) {
        this.isOwner = response.user.id === data.incident.user_id;
      }
    });
  }

  startEdit() {
    this.isEditing = true;
    this.editedTitle = this.incident.title;
    this.editedDescription = this.incident.description;
  }

  edit() {
    this.dialogRef.close({
      action: 'edit',
      incident: this.incident,
    });
  }

  cancelEdit() {
    this.isEditing = false;
  }

  saveEdit() {
    const payload: UpdateIncident = {
      id: this.incident.id,
      title: this.editedTitle,
      description: this.editedDescription,
    };

    this.incidentService.updateIncident(payload).subscribe((updated) => {
      if (updated.title) {
        this.incident.title = updated.title;
      }
      if (updated.description) {
        this.incident.description = updated.description;
      }

      this.isEditing = false;
    });
  }

  delete() {
    const payload = {
      id: parseInt(this.incident.id),
    };

    this.incidentService.deleteIncident(payload).subscribe((deleted) => {
      this.incidentService.notifyMarkerDeleted(payload.id);
      this.dialogRef.close();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
