import { Component, Input } from '@angular/core';
import { Student } from '../../student/student.model';

@Component({
  selector: 'ngx-echarts',
  styleUrls: ['./echarts.component.scss'],
  templateUrl: './echarts.component.html',
})
export class EchartsComponent {
  @Input() student: Student
}
