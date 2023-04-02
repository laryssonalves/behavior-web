import { AfterViewInit, Component, Input } from '@angular/core';
import { Student } from '../../student/student.model';
import { ECHARTS_DEFAULTS } from '../constants';
import { DashboardService } from '../dashboard.service';
import { AnswersByResultType } from '../interfaces/charts';

@Component({
  selector: 'ngx-echarts-pie',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit {
  @Input() student: Student

  options: any = {};

  echarts = ECHARTS_DEFAULTS

  constructor(private dashboardService: DashboardService) {}

  ngAfterViewInit() {
    this.dashboardService.getAnswersByResultType(this.student.id).toPromise().then((chartData: AnswersByResultType) => {
      this.options = {
        backgroundColor: this.echarts.bg,
        color: [ '#74838F', '#63B3ED', '#FF5B5C', '#06C49A' ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: chartData.data.map(item => item.name),
          textStyle: {
            color: this.echarts.textColor,
          },
          formatter: (name) => `${name} (${chartData.data.find(item => item.name === name).percentage}%)`,
        },
        series: [
          {
            name: 'Repostas por tipo',
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: chartData.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: this.echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: this.echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: this.echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }
}
