import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Consultation, ConsultationExercise } from './consultation.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private consultationUrl = `${environment.apiUrl}consultations/`
  public refreshStudentConsultationList = new EventEmitter<number>()

  constructor(private httpClient: HttpClient, private nbToastrService: NbToastrService) {}

  getStudentConsultationList(studentId: number): Observable<Consultation[]> {
    const url = `${this.consultationUrl}?student=${studentId}&concluded=${true}`

    return this.httpClient.get<Consultation[]>(url).pipe(
      map(consultations => consultations.map(consultation => new Consultation(consultation)))
    )
  }

  getConsultationExerciceList(consultationId: number): Observable<ConsultationExercise[]> {
    const url = `${this.consultationUrl}${consultationId}/exercises/`

    return this.httpClient.get<ConsultationExercise[]>(url).pipe(
      map(exercises => exercises.map(exercise => new ConsultationExercise(exercise)))
    )
  }

  deleteStudentConsultation(studentConsultation: Consultation) {
    const url = `${this.consultationUrl}${studentConsultation.id}/`

    this.httpClient.delete(url).subscribe(
      () => {
        this.nbToastrService.success(null, 'Atendimento do aprendente deletado com sucesso')
        this.refreshStudentConsultationList.emit()
      },
      httpError => {
        const error_detail = httpError.error.detail || 'Não foi possível deletar atendimento'
        this.nbToastrService.danger(null, error_detail)
      }
    )
  }
}
