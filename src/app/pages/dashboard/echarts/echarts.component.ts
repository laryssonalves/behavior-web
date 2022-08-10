import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../student/student.model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'ngx-echarts',
  styleUrls: ['./echarts.component.scss'],
  templateUrl: './echarts.component.html',
})
export class EchartsComponent implements OnInit {
  @Input() student: Student;
  chartData: any[] = []

  constructor(private dashboardService: DashboardService) {}

  async ngOnInit() {
    this.chartData = await this.dashboardService.getComparativeResultType(this.student.id).toPromise();
  }
}
