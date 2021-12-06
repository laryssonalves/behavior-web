import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../student/student.model';
import { DashboardService } from '../dashboard.service';
import { ComparativeTries } from '../interfaces/charts';

@Component({
  selector: 'ngx-tries',
  templateUrl: './tries.component.html',
  styleUrls: ['./tries.component.scss']
})
export class TriesComponent implements OnInit {
  @Input() student: Student

  tries: ComparativeTries

  constructor(private dashboardService: DashboardService) { }

  async ngOnInit() {
    this.tries = await this.dashboardService.getTriesResult(this.student.id).toPromise()
  }

}
