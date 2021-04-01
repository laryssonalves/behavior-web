import { Component, OnInit, QueryList, ViewChildren } from '@angular/core'
import { Student } from '../student.model'
import { StudentService } from '../student.service'
import { GlobalAction } from '../../../action-abstract'
import { NbDialogService, NbPopoverDirective } from '@nebular/theme'
import { StudentModalFormComponent } from '../student-modal-form/student-modal-form'
import { ModalService } from '../../../modals/modal.service'
import { Router } from '@angular/router'

@Component({
  selector: 'ngx-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent extends GlobalAction implements OnInit {
  @ViewChildren(NbPopoverDirective) popovers: QueryList<NbPopoverDirective>

  studentList: Student[] = []

  private loading = false

  constructor(
    private studentService: StudentService,
    private nbDialogService: NbDialogService,
    private modalService: ModalService,
    private router: Router
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

    const refreshList = this.studentService.refreshStudentList.subscribe(async () => {
      await this.getStudents()
    })

    this.subscription.add(refreshList)
  }

  removeStudent(student: Student) {
    this.modalService.showDialogConfirmation(
      'Confirmação de exclusão',
      'Tem certeza que deseja excluir o aprendente? Todos os dados sobre o aprendente serão perdidos de forma irrerversível.',
      () => {
        this.studentService.deleteStudent(student.id)
      }
    )
  }

  openStudentForm(studentToEdit?: Student) {
    const studentModal = Student.createFromJSON(studentToEdit || new Student())
    this.nbDialogService
      .open(StudentModalFormComponent, {
        context: { student: studentModal },
        dialogClass: 'basic-modal'
      })
      .onClose.subscribe(success => {
        if (success) {
          this.studentService.refreshStudentList.emit()
        }
      })
  }

  goToStudentDetails(student: Student) {
    this.router.navigateByUrl(`aprendentes/detalhes/${student.id}`)
  }

  showPopover(event: MouseEvent, i: number) {
    event.stopPropagation()
    const popArr = this.popovers.toArray()
    popArr.find(pop => pop.isShown)?.hide()
    popArr[i].show()
  }

  private async getStudents() {
    try {
      this.showLoading = true
      this.studentList = await this.studentService.getStudentList().toPromise()
    } catch (e) {
      this.modalService.showDialogError(e)
    } finally {
      this.showLoading = false
    }
  }
}
