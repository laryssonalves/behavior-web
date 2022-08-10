import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../../../modals/modal.service';
import { DashboardService } from '../../../../dashboard/dashboard.service';
import { StudentExercise } from '../student-exercise.model';
import { StudentExerciseService } from '../student-exercise.service';

@Component({
  selector: 'ngx-student-exercise-charts',
  templateUrl: './student-exercise-charts.component.html',
  styleUrls: ['./student-exercise-charts.component.scss']
})
export class StudentExerciseChartsComponent implements OnInit {
  exercise: StudentExercise;
  chartData: any[] = [];
  isLoading = false;

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private studentExerciseService: StudentExerciseService,
    private modalService: ModalService
  ) { }

  async ngOnInit() {
    try {
    this.isLoading = true;

    const studentExerciseId = Number(this.route.snapshot.paramMap.get('id'))
    const studentId = Number(this.route.snapshot.paramMap.get('studentId'))
    this.exercise = await this.studentExerciseService.getStudentExercise(studentId, studentExerciseId).toPromise()

    const { student, id } = this.exercise;
    this.chartData = await this.dashboardService.getComparativeApplicationType(student.id, id).toPromise();
    } catch (e) {
      this.modalService.showDialogError(e)
    } finally {
      this.isLoading = false;
    }
  }

  private async getStudentExercise() {
    try {

    } catch (e) {
      this.modalService.showDialogError(e)
    }
  }

}
