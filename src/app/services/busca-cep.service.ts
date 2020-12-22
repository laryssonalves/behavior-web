import { Injectable } from '@angular/core'
import * as cep from 'cep-promise'

@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {

  constructor() { }

  async buscaCep(postalCode: string) {
    try {
      const cepResult = await cep(postalCode)

      const { state, city, street, neighborhood } = cepResult

      return { state, city, street, district: neighborhood }
    } catch (error) {
      const { message } = error
      alert(message)
    }
  }
}
