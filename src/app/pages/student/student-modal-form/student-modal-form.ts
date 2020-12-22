import { Component, OnInit } from '@angular/core'
import { NbDialogRef, NbToastrService } from '@nebular/theme'
import { Student } from '../student.model'
import { StudentService } from '../student.service'
import { SessionStorageService } from '../../../services/session-storage.service'
import { genreChoiceList } from '../../../models/choice.model'

@Component({
  selector: 'ngx-student-modal-form',
  templateUrl: 'student-modal-form.html',
  styleUrls: [ 'student-modal-form.scss' ]
})
export class StudentModalFormComponent implements OnInit {
  title: string
  company: number
  student: Student

  genreChoices = genreChoiceList()

  private loading = false

  constructor(
    protected ref: NbDialogRef<StudentModalFormComponent>,
    private studentService: StudentService,
    private sessionStorageService: SessionStorageService,
    private nbToastrService: NbToastrService
  ) {}

  get showLoading(): boolean {
    return this.loading
  }

  set showLoading(saving: boolean) {
    this.loading = saving
  }

  ngOnInit() {
    this.title = this.student.id ? 'Editar estudante' : 'Adicionar estudante'
  }

  async saveStudent() {
    try {
      this.showLoading = true
      this.student.errors = null

      if (this.student.id) {
        this.student = await this.studentService.updateStudent(this.student).toPromise()
      } else {
        const company = this.sessionStorageService.getSelectedCompany()
        this.student.company = company.id
        this.student = await this.studentService.addStudent(this.student).toPromise()
      }

      this.studentService.refreshStudentList.emit()
      this.close(true)
    } catch (error) {
      this.student.errors = error.error
    } finally {
      this.showLoading = false
      this.showToastr(!this.student.errors)
    }
  }

  close(success: boolean) {
    this.ref.close(success)
  }

  private showToastr(success: boolean) {
    if (success) {
      this.nbToastrService.success(null, 'Estudante salvo com sucesso')
    } else {
      this.nbToastrService.warning(
        'Por favor, verique os campos do formulário',
        'Há campos inválidos no formulário'
      )
    }
  }
}
