import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ECHARTS_DEFAULTS } from '../constants';

@Component({
  selector: 'ngx-echarts-line',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsLineComponent implements OnChanges {
  echarts = ECHARTS_DEFAULTS

  @Input() customOptions: any = {};

  options: any = {
    backgroundColor: this.echarts.bg,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/> {b} : {c}',
    },
    legend: {
      left: 'left',
      data: [],
      textStyle: {
        color: this.echarts.textColor,
      },
    },
    toolbox: {
      feature: {
          saveAsImage: {},
          restore: {},
      }
    },
    dataZoom: [
      {
          type: 'inside', // Enables zooming and panning inside the chart
          start: 0,
          end: 100
      },
      {
          start: 0,
          end: 10,
          handleSize: '80%',
          handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
          }
      }
    ],
    xAxis: [
      {
        type: 'category',
        data: this.echarts.xAxisData,
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
    ...this.customOptions,
  };

  ngOnChanges(changes: SimpleChanges): void {
    const { customOptions } = changes;

    this.options = {
      ...this.options,
      ...(customOptions?.currentValue || this.customOptions),
    }
  }
}
