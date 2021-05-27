import { masks } from "./constants"

export const getPhoneMask = (phone: string) => {
  let phoneMask = masks.TELEFONE

  if (phone.length === 11) {
    phoneMask = masks.TELEFONE_CELULAR
  }

  return phoneMask
}