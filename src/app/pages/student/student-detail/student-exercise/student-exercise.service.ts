import { EventEmitter, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { NbToastrService } from '@nebular/theme'
import { Observable } from 'rxjs'
import { StudentExercise } from './student-exercise.model'
import { map } from 'rxjs/operators'
import { environment } from '../../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StudentExerciseService {
  private studentUrl = `${ environment.apiUrl }student/`

  public refreshStudentExerciseList = new EventEmitter<number>()

  constructor(private httpClient: HttpClient, private nbToastrService: NbToastrService) { }

  getStudentExerciseList(studentId: number): Observable<StudentExercise[]> {
    const studentExerciseUrl = `${this.studentUrl}${studentId}/exercise/`

    return this.httpClient.get<StudentExercise[]>(studentExerciseUrl).pipe(
      map(studentExercises => studentExercises.map(studentExercise => StudentExercise.createFromJSON(studentExercise)))
    )
  }

  addStudentExercise(studentExercise: StudentExercise): Observable<StudentExercise> {
    const studentExerciseUrl = `${ this.studentUrl }${ studentExercise.student.id }/exercise/`

    return this.httpClient.post<StudentExercise>(studentExerciseUrl, studentExercise.getPayload())
  }

  getStudentExercise(studentId: number, studentExerciseId: number): Observable<StudentExercise> {
    const studentExerciseUrl = `${ this.studentUrl }${ studentId }/exercise/${studentExerciseId}`

    return this.httpClient.get<StudentExercise>(studentExerciseUrl)
  }

  deleteStudentExercise(studentExercise: StudentExercise) {
    const studentExerciseUrl = `${ this.studentUrl }${ studentExercise.student.id }/exercise/${studentExercise.id}`

    this.httpClient.delete(studentExerciseUrl).subscribe(
      () => {
        this.nbToastrService.success(null, 'Treino desvinculado do estudante com sucesso')
        this.refreshStudentExerciseList.emit(studentExercise.student.id)
      },
      error => {
        this.nbToastrService.danger(null, 'Não foi possível disvincular treino')
      }
    )
  }

  updateStudentExercise(studentExercise: StudentExercise): Observable<StudentExercise> {
    const studentExerciseUrl = `${ this.studentUrl }${ studentExercise.student.id }/exercise/${studentExercise.id}/`

    return this.httpClient.put<StudentExercise>(studentExerciseUrl, studentExercise.getPayload())
  }
}

