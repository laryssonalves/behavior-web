import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NbToastrService } from "@nebular/theme";
import { Observable } from "rxjs";
import { StudentMember } from "./student-member.model";
import { map } from "rxjs/operators";
import { Student } from "../../student.model";
import { environment } from "../../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class StudentMemberService {
  private studentUrl = `${environment.apiUrl}student/`;

  public refreshStudentMemberList = new EventEmitter<number>();

  constructor(
    private httpClient: HttpClient,
    private nbToastrService: NbToastrService
  ) {}

  getStudentMemberList(studentId: number): Observable<StudentMember[]> {
    const studentMemberUrl = `${this.studentUrl}${studentId}/member/`;

    return this.httpClient
      .get<StudentMember[]>(studentMemberUrl)
      .pipe(
        map((studentMembers) =>
          studentMembers.map((studentMember) =>
            StudentMember.createFromJSON(studentMember)
          )
        )
      );
  }

  addStudentMember(studentMember: StudentMember): Observable<StudentMember> {
    const studentDetailUrl = `${this.studentUrl}${studentMember.student.id}/member/`;

    return this.httpClient.post<StudentMember>(
      studentDetailUrl,
      studentMember.getPayload()
    );
  }

  getStudentMember(
    studentId: number,
    studentMemberId: number
  ): Observable<StudentMember> {
    const studentDetailUrl = `${this.studentUrl}${studentId}/member/${studentMemberId}`;

    return this.httpClient.get<StudentMember>(studentDetailUrl);
  }

  deleteStudentMember(studentMember: StudentMember) {
    const studentDetailUrl = `${this.studentUrl}${studentMember.student.id}/member/${studentMember.id}`;

    this.httpClient.delete(studentDetailUrl).subscribe(
      () => {
        this.nbToastrService.success(
          null,
          "Membro desvinculado do aprendente com sucesso"
        );
        this.refreshStudentMemberList.emit(studentMember.student.id);
      },
      (error) => {
        this.nbToastrService.danger(
          null,
          "Não foi possível disvincular membro"
        );
      }
    );
  }

  updateStudentMember(studentMember: StudentMember): Observable<StudentMember> {
    const studentDetailUrl = `${this.studentUrl}${studentMember.student.id}/member/${studentMember.id}/`;

    return this.httpClient.put<StudentMember>(
      studentDetailUrl,
      studentMember.getPayload()
    );
  }

  addStudentMemberList(student: Student, members_id: number[]) {
    const studentDetailUrl = `${this.studentUrl}${student.id}/member/`;

    return this.httpClient.post<StudentMember>(studentDetailUrl, {
      members_id,
    });
  }
}
