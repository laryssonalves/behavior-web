import { Component, OnInit } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'
import { ResultTypeChoice } from '../../../../models/choice.model'
import { Consultation, ConsultationExercise } from '../student-consultation/consultation.model'
import { ConsultationService } from '../student-consultation/consultation.service'

@Component({
  selector: 'ngx-student-consultation-resume',
  templateUrl: './student-consultation-resume.component.html',
  styleUrls: ['./student-consultation-resume.component.scss']
})
export class StudentConsultationResumeComponent implements OnInit {
  consultation: Consultation
  consultationExerciseList: ConsultationExercise[] = []

  ResultTypeChoice = ResultTypeChoice

  title = 'Detalhes do atendimento'
  subTitle = ''
  isLoading = false

  targetsVisibleIndexList: number[] = []

  constructor(
    protected ref: NbDialogRef<StudentConsultationResumeComponent>,
    private consultationService: ConsultationService
  ) {}

  ngOnInit(): void {
    this.subTitle = `${this.consultation.student.name} - Terapeuta: ${this.consultation.owner.name}`
    this.getExercises()
  }

  getExercises() {
    this.isLoading = true

    this.consultationService
      .getConsultationExerciceList(this.consultation.id)
      .toPromise()
      .then(consultationExercises => (this.consultationExerciseList = consultationExercises))
      .catch(error => console.error(error))
      .finally(() => (this.isLoading = false))
  }

  isTargetListVisible(index: number): boolean {
    const consultationExercise = this.consultationExerciseList[index]
    return consultationExercise.is_applied && this.isTargetVisible(index)
  }

  setTargetListVisible(index: number) {
    if (this.isTargetVisible(index)) {
      this.targetsVisibleIndexList = this.targetsVisibleIndexList.filter(i => i !== index)
    } else {
      this.targetsVisibleIndexList.push(index)
    }
  }

  isTargetVisible(index: number): boolean {
    return this.targetsVisibleIndexList.includes(index)
  }

  isDividerVisible(consultationExercise: ConsultationExercise, index: number): boolean {
    const isLastIndex = index === consultationExercise.targets.length - 1

    const dividend = index + 1
    const divisor = consultationExercise.exercise.total_targets

    if (dividend === 1 || divisor === 1 || isLastIndex) {
      return false
    }

    const quotient = dividend > divisor ? dividend / divisor : divisor / dividend

    return Math.floor(quotient) === quotient
  }
}
