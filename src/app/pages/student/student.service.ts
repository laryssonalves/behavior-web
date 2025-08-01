import { EventEmitter, Injectable } from "@angular/core";
import { Student } from "./student.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";
import { NbToastrService } from "@nebular/theme";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  public refreshStudentList = new EventEmitter()
  private studentUrl = `${ environment.apiUrl }student/`

  constructor(
    private httpClient: HttpClient,
    private nbToastrService: NbToastrService
  ) {}

  getStudentList(): Observable<Student[]> {
    return this.httpClient
      .get<Student[]>(this.studentUrl)
      .pipe(
        map((students) =>
          students.map((student) => new Student(student))
        )
      );
  }

  getStudent(pk: string | number): Observable<Student> {
    const studentDetailUrl = `${this.studentUrl}${pk}/`;

    return this.httpClient.get<Student>(studentDetailUrl);
  }

  deleteStudent(pk: string | number) {
    const studentDetailUrl = `${this.studentUrl}${pk}/`;

    this.httpClient.delete(studentDetailUrl).subscribe(
      () => {
        this.nbToastrService.success(null, "Aprendente deletado com sucesso");
        this.refreshStudentList.emit();
      },
      (httpError) => {
        this.nbToastrService.danger(
          null,
          httpError?.error?.detail || "Não foi possível deletar o Aprendente",
        );
      }
    );
  }

  addStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.studentUrl, student.getPayload());
  }

  updateStudent(student: Student): Observable<Student> {
    const studentDetailUrl = `${this.studentUrl}${student.id}/`;

    return this.httpClient.put<Student>(studentDetailUrl, student.getPayload());
  }
}
