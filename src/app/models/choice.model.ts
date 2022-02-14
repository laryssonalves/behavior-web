export interface Choice {
  value: number | string
  name: string
}

export enum RoleChoice {
  CREATOR = 1,
  APPLICATOR = 2,
  ADMIN = 3,
  COORDINATOR = 4,
  SUPERVISOR = 5
}

export const isAdmin = (role: RoleChoice) => role === RoleChoice.ADMIN

export const roleChoiceList = (): Choice[] => {
  return [
    { value: RoleChoice.APPLICATOR, name: 'Aplicadora(dor)' },
    { value: RoleChoice.ADMIN, name: 'Admin' },
    { value: RoleChoice.COORDINATOR, name: 'Coordenadora(dor)' },
    { value: RoleChoice.SUPERVISOR, name: 'Supervisora(sor)' }
  ]
}

export enum GenreChoice {
  GENRE_MALE = 1,
  GENRE_FEMALE = 2,
  GENRE_UNINFORMED = 3,
  GENRE_NOTBINARY = 4
}

export const genreChoiceList = (): Choice[] => {
  return [
    { value: GenreChoice.GENRE_MALE, name: 'Masculino' },
    { value: GenreChoice.GENRE_FEMALE, name: 'Feminino' },
    { value: GenreChoice.GENRE_NOTBINARY, name: 'Não binário' },
    { value: GenreChoice.GENRE_UNINFORMED, name: 'Não informado' }
  ]
}

export enum ApplicationTypeChoice {
  BASELINE = 1,
  INTERVENTION = 2,
  MAINTENANCE = 3,
  PROBE = 4
}

export const applicationTypeChoiceList = (): Choice[] => {
  return [
    { value: ApplicationTypeChoice.BASELINE, name: 'Linha de base' },
    { value: ApplicationTypeChoice.INTERVENTION, name: 'Intervenção' },
    { value: ApplicationTypeChoice.MAINTENANCE, name: 'Manutenção' },
    { value: ApplicationTypeChoice.PROBE, name: 'Sonda' }
  ]
}

export enum HelpTypeChoice {
  PHYSICAL_HELP = 1,
  PARTIAL_PHYSICAL_HELP = 2,
  PHYSICAL_TIP = 3,
  ECHO_TIP = 4,
  PARTIAL_ECHO_TIP = 5,
  VISUAL_TIP = 6,
  TEXT_TIP = 7,
  GEST_TIP = 8,
  MODEL_TIP = 9,
  LATE_TIP = 10,
  NECESSARY_HELP = 11,
  INDEPENDENT = 12,
}

export const helpTypeChoiceList = (): Choice[] => {
  return [
    { value: HelpTypeChoice.PHYSICAL_HELP, name: 'Ajuda física total' },
    { value: HelpTypeChoice.PARTIAL_PHYSICAL_HELP, name: 'Ajuda física parcial' },
    { value: HelpTypeChoice.PHYSICAL_TIP, name: 'Dica física' },
    { value: HelpTypeChoice.ECHO_TIP, name: 'Dica ecoica' },
    { value: HelpTypeChoice.PARTIAL_ECHO_TIP, name: 'Dica ecoica parcial' },
    { value: HelpTypeChoice.VISUAL_TIP, name: 'Dica visual' },
    { value: HelpTypeChoice.TEXT_TIP, name: 'Dica textual' },
    { value: HelpTypeChoice.GEST_TIP, name: 'Dica gestual' },
    { value: HelpTypeChoice.MODEL_TIP, name: 'Dica modelo' },
    { value: HelpTypeChoice.LATE_TIP, name: 'Atraso de dica' },
    { value: HelpTypeChoice.NECESSARY_HELP, name: 'Ajuda necessária' },
    { value: HelpTypeChoice.INDEPENDENT, name: 'Independente' },
  ]
}

export enum ResultTypeChoice {
  NOT_APPLIED = 1,
  INDEPENDENT = 2,
  CORRECT_WITH_HELP = 3,
  WRONG = 4
}

export const resultTypeChoiceList = (): Choice[] => {
  return [
    { value: ResultTypeChoice.NOT_APPLIED, name: 'Não aplicado' },
    { value: ResultTypeChoice.INDEPENDENT, name: 'Independente' },
    { value: ResultTypeChoice.CORRECT_WITH_HELP, name: 'Correto com ajuda' },
    { value: ResultTypeChoice.WRONG, name: 'Incorreta' }
  ]
}
