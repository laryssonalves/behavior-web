import { AfterViewInit, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Student } from '../../student/student.model';
import { ECHARTS_DEFAULTS } from '../constants';
import { DashboardService } from '../dashboard.service';
import { ComparativeData } from '../interfaces/charts';

@Component({
  selector: 'ngx-echarts-line',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsLineComponent implements OnChanges {
  @Input() chartData: any[] = []

  options: any = {};

  echarts = ECHARTS_DEFAULTS

  ngOnChanges(changes: SimpleChanges): void {
    const { chartData: { currentValue } } = changes;
    this.chartData = currentValue;
    this.getOptions();
  }

  getOptions() {
    const series = this.chartData.map(data => ({ ...data, type: 'line' }))

    this.options = {
      backgroundColor: this.echarts.bg,
      color: [ '#74838F', '#63B3ED', '#FF5B5C', '#06C49A' ],
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}',
      },
      legend: {
        left: 'left',
        data: this.chartData.map(data => data.name),
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
  }
}
