import { Component, OnInit } from '@angular/core'
import { Student } from '../student.model'
import { StudentService } from '../student.service'
import { GlobalAction } from '../../../action-abstract'
import { NbDialogService } from '@nebular/theme'
import { StudentModalFormComponent } from '../student-modal-form/student-modal-form'
import { ErrorModalComponent } from '../../../modals/error-modal/error-modal'

@Component({
  selector: 'ngx-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: [ './student-list.component.scss' ]
})
export class StudentListComponent extends GlobalAction implements OnInit {
  studentList: Student[] = []

  private loading = false

  constructor(
    private studentService: StudentService,
    private nbDialogService: NbDialogService
  ) {
    super()
  }

  get showLoading(): boolean {
    return this.loading
  }

  set showLoading(loading: boolean) {
    this.loading = loading
  }

  async ngOnInit(): Promise<void> {
    await this.getStudents()

    const refreshList = this.studentService.refreshStudentList.subscribe(async () => { await this.getStudents() })

    this.subscription.add(refreshList)
  }

  removeStudent(student: Student) {
    this.studentService.deleteStudent(student.id)
  }

  openStudentForm(studentToEdit?: Student) {
    const studentModal = Student.createFromJSON(studentToEdit || new Student())
    this.nbDialogService.open(
      StudentModalFormComponent,
      { context: { student: studentModal }, dialogClass: 'my-modal' }
    ).onClose.subscribe(success => {
      if (success) {
        this.studentService.refreshStudentList.emit()
      }
    })
  }

  private async getStudents() {
    try {
      this.showLoading = true
      this.studentList = await this.studentService.getStudentList().toPromise()
    } catch (e) {
      this.openDialogError(e)
    } finally {
      this.showLoading = false
    }
  }

  private openDialogError(error: any) {
    this.nbDialogService.open(
      ErrorModalComponent,
      { context: { error: error }, hasScroll: true, dialogClass: 'my-modal' }
    )
  }
}
