import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-incident-dialog',
  standalone: true,
  templateUrl: './incident-dialog.html',
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class IncidentDialog {
  model = {
    type: '',
    title: '',
    description: '',
  };

  constructor(
    private dialogRef: MatDialogRef<IncidentDialog>,
    private incidentService: IncidentService,
    @Inject(MAT_DIALOG_DATA) public data: { lat: number; lng: number }
  ) {}

  submit() {
    this.incidentService
      .createIncident({
        type: this.model.type,
        description: `${this.model.title} - ${this.model.description}`,
        location: {
          lat: this.data.lat,
          lng: this.data.lng,
        },
        date: new Date().toISOString(),
      })
      .subscribe({
        next: (res) => this.dialogRef.close(res),
        error: () => alert('Erreur lors de la création'),
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}
