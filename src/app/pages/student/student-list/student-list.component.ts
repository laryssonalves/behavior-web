import { Component, OnInit, QueryList, ViewChildren } from '@angular/core'
import { Student } from '../student.model'
import { StudentService } from '../student.service'
import { GlobalAction } from '../../../action-abstract'
import { NbDialogService, NbPopoverDirective } from '@nebular/theme'
import { StudentModalFormComponent } from '../student-modal-form/student-modal-form'
import { ModalService } from '../../../modals/modal.service'
import { Router } from '@angular/router'
import { User } from '../../security/user/user.model'
import { UserService } from '../../security/user/user.service'

@Component({
  selector: 'ngx-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent extends GlobalAction implements OnInit {
  studentList: Student[] = []

  private user: User
  private loading = false

  constructor(
    private studentService: StudentService,
    private userService: UserService,
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

    const userSubscription = this.userService.userSubject.subscribe(user => (this.user = user))

    this.subscription.add(refreshList)
    this.subscription.add(userSubscription)
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
    const studentModal = new Student(studentToEdit)
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

  checkUserPerm(perm: string) {
    return this.user?.hasPerms([perm])
  }
}
