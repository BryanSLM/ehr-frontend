import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-labs-report-details',
  standalone: true,
  imports: [],
  templateUrl: './labs-report-details.component.html',
  styleUrl: './labs-report-details.component.css',
})
export class LabsReportDetailsComponent {
  constructor(private readonly route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
    });
  }
}
