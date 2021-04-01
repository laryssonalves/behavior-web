import { Injectable } from '@angular/core'
import { NbToastrService } from '@nebular/theme'

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private nbToastrService: NbToastrService) {}

  showFormResponseToast(success: boolean, successMsg: string) {
    if (success) {
      this.nbToastrService.success(null, successMsg)
    } else {
      this.nbToastrService.warning('Por favor, verique os campos do formulário', 'Há campos inválidos no formulário')
    }
  }
}
