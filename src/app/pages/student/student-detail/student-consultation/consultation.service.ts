import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { Consultation, ConsultationExercise } from './consultation.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  private consultationUrl = `${environment.apiUrl}consultations/`

  constructor(private httpClient: HttpClient) {}

  getStudentConsultationList(studentId: number): Observable<Consultation[]> {
    const studentExerciseUrl = `${this.consultationUrl}?student=${studentId}&concluded=${true}`

    return this.httpClient.get<Consultation[]>(studentExerciseUrl).pipe(
      map(consultations => consultations.map(consultation => new Consultation(consultation)))
    )
  }

  getConsultationExerciceList(consultationId: number): Observable<ConsultationExercise[]> {
    const url = `${this.consultationUrl}${consultationId}/exercises/`

    return this.httpClient.get<ConsultationExercise[]>(url).pipe(
      map(exercises => exercises.map(exercise => new ConsultationExercise(exercise)))
    )
  }

}
