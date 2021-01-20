import { GenreChoice, genreChoiceList } from '../../models/choice.model'
import CoreModel from '../../models/core-model.model'
import { Moment } from 'moment'
import * as moment from 'moment'

export class Student extends CoreModel {
  id: number
  company: number
  name: string
  age: number
  genre: GenreChoice
  birth_date: Moment
  first_avaliation_date: Moment

  errors: StudentValidationError

  genreDisplay(): string {
    return genreChoiceList().find(genre => this.genre === genre.value).name
  }

  static createFromJSON(data): Student {
    const dates = {
      birth_date: data.birth_date ? moment(`${ data.birth_date }`) : null,
      first_avaliation_date: data.first_avaliation_date ? moment(`${ data.first_avaliation_date }`) : null
    }
    return Object.assign(new Student(), data, dates)
  }

  getPayload(): Object {
    return {
      id: this.id,
      name: this.name,
      genre: this.genre,
      birth_date: this.birth_date.format('YYYY-MM-DD'),
      company: this.company
    }
  }

  getAvaliationDate(): string {
    return this.first_avaliation_date ? this.first_avaliation_date.format('DD/MM/YYYY') : ''
  }
}

interface StudentValidationError {
  company: string[]
  name: string[]
  age: string[]
  genre: string[]
  birth_date: string[]
  first_avaliation_date: string[]
}
