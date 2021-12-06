import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core';
import { Student } from '../../student/student.model';
import { ECHARTS_DEFAULTS } from '../constants';
import { DashboardService } from '../dashboard.service';
import { ComparativeResultType } from '../interfaces/charts';

@Component({
  selector: 'ngx-echarts-line',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsLineComponent implements AfterViewInit {
  @Input() student: Student

  options: any = {};

  echarts = ECHARTS_DEFAULTS

  constructor(private dashboardService: DashboardService) {}

  ngAfterViewInit() {
    this.dashboardService.getComparativeResultType(this.student.id).toPromise().then((chartData: ComparativeResultType[]) => {
      const series = chartData.map(data => ({ ...data, type: 'line' }))

      this.options = {
        backgroundColor: this.echarts.bg,
        color: [ '#74838F', '#63B3ED', '#FF5B5C', '#06C49A' ], 
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
        },
        legend: {
          left: 'left',
          data: chartData.map(data => data.name),
          textStyle: {
            color: this.echarts.textColor,
          },
        },
        xAxis: [
          {
            type: 'category',
            data: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: this.echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: this.echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: this.echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: this.echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: this.echarts.textColor,
              },
            },
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        series,
      };
    })
  }
}
