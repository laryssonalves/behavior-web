import * as moment from "moment"
import { Moment } from "moment"
import { masks } from "./constants"

export const getPhoneMask = (phone: string) => {
  let phoneMask = masks.TELEFONE

  if (phone.length === 11) {
    phoneMask = masks.TELEFONE_CELULAR
  }

  return phoneMask
}

export const getDuration = (create_date: Moment, concluded_date: Moment) => {
  const daysDiff = concluded_date.diff(create_date, 'days')
  const diff = moment.utc(moment.duration(concluded_date.diff(create_date)).asMilliseconds())
  const days = daysDiff ? `${daysDiff}d` : ''
  const hours = diff.hours() ? `${diff.hours()}h` : ''
  const min = diff.minutes() ? `${diff.minutes()}min` : ''
  return `${days} ${hours} ${min}`
}