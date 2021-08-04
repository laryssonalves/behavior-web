import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ResultTypeChoice } from '../../../../models/choice.model';
import { Consultation, ConsultationExercise } from '../student-consultation/consultation.model';
import { ConsultationService } from '../student-consultation/consultation.service';

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

  constructor(protected ref: NbDialogRef<StudentConsultationResumeComponent>, private consultationService: ConsultationService) {}

  ngOnInit(): void {
    this.subTitle = `${this.consultation.student.name} - Terapeuta: ${this.consultation.owner.name}`
    this.getExercises()
  }

  getExercises() {
    this.isLoading = true
    
    this.consultationService.getConsultationExerciceList(this.consultation.id).toPromise()
      .then(consultationExercises => this.consultationExerciseList = consultationExercises)
      .catch(error => console.error(error))
      .finally(() => this.isLoading = false)
  }
}
