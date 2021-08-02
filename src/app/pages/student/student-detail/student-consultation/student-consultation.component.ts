import { Component, Input, OnInit } from '@angular/core';
import { GlobalAction } from '../../../../action-abstract';
import { ModalService } from '../../../../modals/modal.service';
import { User } from '../../../security/user/user.model';
import { Student } from '../../student.model';
import { Consultation } from './consultation.model';
import { ConsultationService } from './consultation.service';

@Component({
  selector: 'ngx-student-consultation',
  templateUrl: './student-consultation.component.html',
  styleUrls: ['./student-consultation.component.scss']
})
export class StudentConsultationComponent extends GlobalAction implements OnInit {
  @Input() user: User
  @Input() student: Student

  consultationList: Consultation[] = []

  isLoading = false

  constructor(
    private consultationService: ConsultationService,
    private modalService: ModalService
  ) {
    super()
  }

  async ngOnInit() {
    await this.getConsultationList()
  }
  
  private async getConsultationList() {
    try {
      this.isLoading = true
      this.consultationList = await this.consultationService.getStudentConsultationList(this.student.id).toPromise()
    } catch (e) {
      this.modalService.showDialogError(e)
    } finally {
      this.isLoading = false
    }
  }
}
