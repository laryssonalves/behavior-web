import { Moment } from "moment"

export default class CoreModel {
  create_date: string | Moment
  update_date: string
  active: boolean
}
