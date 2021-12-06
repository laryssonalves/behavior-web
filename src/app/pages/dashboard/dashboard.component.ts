import { Component, Input } from '@angular/core'
import { Student } from '../student/student.model'

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  @Input() student: Student
}
