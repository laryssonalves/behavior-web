import { Component, Input, OnInit } from '@angular/core'
import { Student } from '../student/student.model'
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @Input() student: Student

  comparativeResulTypeOptions: any = {
    color: [ '#74838F', '#63B3ED', '#06C49A', '#FF5B5C' ],
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value: number | string) => `${value} resposta(s)`
    },
  }

  constructor(private dashboardService: DashboardService) { }

  async ngOnInit() {
    const comparativeResultTypeData = await this.dashboardService.getComparativeResultType(this.student.id).toPromise();
    const names = comparativeResultTypeData.map(d => d.name)
    const series = comparativeResultTypeData.map(data => ({ ...data, type: 'line' }))

    this.comparativeResulTypeOptions = {
      ...this.comparativeResulTypeOptions,
      legend: { data: names },
      series,
    }
  }
}
