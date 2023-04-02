import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { ModalService } from '../../../../../modals/modal.service';
import { DashboardService } from '../../../../dashboard/dashboard.service';
import { StudentExercise } from '../student-exercise.model';
import { StudentExerciseService } from '../student-exercise.service';
import _ from 'lodash';
import { ComparativeData, ComparativeDataByConsultation, ComparativeDataByConsultationData } from '../../../../dashboard/interfaces/charts';

@Component({
  selector: 'ngx-student-exercise-charts',
  templateUrl: './student-exercise-charts.component.html',
  styleUrls: ['./student-exercise-charts.component.scss']
})
export class StudentExerciseChartsComponent implements OnInit {
  isLoading = false;
  exercise: StudentExercise;
  commonColors = [ '#74838F', '#63B3ED', '#FFA500', '#06C49A' ];
  comparativeDataOptions: any = {
    color: this.commonColors,
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value: number | string) => `${value} acerto(s)`
    },
  }
  comparativeDataByConsultationOptions: any = {
    color: this.commonColors,
    tooltip: {
      trigger: 'axis',
      valueFormatter: (value: number | string) => `${value}%`
    },
  };

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    private studentExerciseService: StudentExerciseService,
    private modalService: ModalService,
    private location: Location,
  ) { }

  async ngOnInit() {
    try {
      this.isLoading = true;

      const studentExerciseId = Number(this.route.snapshot.paramMap.get('id'))
      const studentId = Number(this.route.snapshot.paramMap.get('studentId'))
      this.exercise = await this.studentExerciseService.getStudentExercise(studentId, studentExerciseId).toPromise()

      const { student, id: exerciseId } = this.exercise;
      const comparativeDataPromise = this.dashboardService.getComparativeApplicationType(student.id, exerciseId).toPromise();
      const comparativeDataByConsultationPromise = this.dashboardService.getComparativeApplicationTypeByConsultation(student.id, exerciseId).toPromise();

      const [ comparativeData, comparativeDataByConsultation ] = await Promise.all([ comparativeDataPromise, comparativeDataByConsultationPromise ]);

      this.getComparativeDataOptions(comparativeData)
      this.getComparativeDataByConsultationOptions(comparativeDataByConsultation)
    } catch (e) {
      this.modalService.showDialogError(e)
    } finally {
      this.isLoading = false;
    }
  }
  getComparativeDataByConsultationOptions(comparativeDataByConsultation: ComparativeDataByConsultation[]) {
    const comparativeDataByConsultationNames = comparativeDataByConsultation.map(d => d.name)
    const flatData = _.flatten(comparativeDataByConsultation.map(d => d.data))
    const xAxisData = [... new Set(flatData.map((d: ComparativeDataByConsultationData) => `${d.date}`))]
    this.comparativeDataByConsultationOptions = {
      ...this.comparativeDataByConsultationOptions,
      legend: { data: comparativeDataByConsultationNames },
      xAxis: [{ data: xAxisData }],
      series: comparativeDataByConsultation.map(d => ({
        name: d.name,
        type: 'line',
        data: d.data.map(d => d.value)
      }))
    }
  }

  getComparativeDataOptions(comparativeData: ComparativeData[]) {
    const comparativeDataNames = comparativeData.map(d => d.name)

    this.comparativeDataOptions = {
      ...this.comparativeDataOptions,
      legend: { data: comparativeDataNames },
      series: comparativeData.map(data => ({ ...data, type: 'line' })),
    }
  }

  goBack() {
    this.location.back()
  }
}
