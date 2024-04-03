import { Component, Input, OnInit } from '@angular/core'
import { Student } from '../student/student.model'
import { DashboardService } from './dashboard.service';
import { ComparativeAnswersInBucketOfDates, ComparativeData } from './interfaces/charts';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @Input() student: Student
  comparativeResultTypeData: ComparativeData[]
  comparativeAnswersBucketInDatesData: ComparativeAnswersInBucketOfDates

  comparativeResulTypeOptions: any = {
    color: [ '#74838F', '#63B3ED', '#06C49A', '#FF5B5C' ],
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value: number | string) => `${value} resposta(s)`
    },
  }

  comparativeAnswersInBucketOfDatesOptions: any = {
    color: [ '#F9CC15', '#000', '#FF5B5C' ],
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value: number | string) => `${value}%`
    },
  }

  constructor(private dashboardService: DashboardService) { }

  async ngOnInit() {
    const [comparativeResultTypeData, comparativeAnswersBucketInDatesData] = await Promise.all([
      this.dashboardService.getComparativeResultType(this.student.id).toPromise(),
      this.dashboardService.getComparativeAnswersBucketInDates(this.student.id).toPromise(),
    ])

    this.comparativeResultTypeData = comparativeResultTypeData
    this.updateComparativeResulTypeOptions()

    this.comparativeAnswersBucketInDatesData = comparativeAnswersBucketInDatesData
    this.updateComparativeAnswersBucketInDatesOptions()
  }

  updateComparativeResulTypeOptions() {
    const names = this.comparativeResultTypeData.map(d => d.name)
    const series = this.comparativeResultTypeData.map(data => ({ ...data, type: 'line' }))

    this.comparativeResulTypeOptions = {
      ...this.comparativeResulTypeOptions,
      legend: { data: names },
      series,
    }
  }

  updateComparativeAnswersBucketInDatesOptions() {
    const names = this.comparativeAnswersBucketInDatesData.data.map(d => d.name)
    const xAxisData = this.comparativeAnswersBucketInDatesData.dates.map(d => `${d}`)
    const marks = this.comparativeAnswersBucketInDatesData.marks;
    const series = this.comparativeAnswersBucketInDatesData.data.map(data => ({
      ...data,
      type: 'line',
      markLine: {
        data: marks.map(({ name, date }) => ({ xAxis: date, name, })),
        symbol: ['none', 'none'],
        label: {
          show: true,
          position: 'middle',
          formatter: '{b}'
        },
        lineStyle: {
          color: 'black',
          type: 'solid',
          width: 3,
        }
      },
    }))

    console.log({ names, series, xAxisData })

    this.comparativeAnswersInBucketOfDatesOptions = {
      ...this.comparativeAnswersInBucketOfDatesOptions,
      legend: { data: names },
      xAxis: [{
        data: xAxisData,
      }],
      series,
    }
  }
}
