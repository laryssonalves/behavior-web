export interface Choice {
  value: number | string
  name: string
}

export enum RoleChoice {
  CREATOR = 1,
  APPLICATOR = 2,
  ADMIN = 3,
  ANALYST = 4
}

export const roleChoiceList = (): Choice[] => {
  return [
    // { value: RoleChoice.CREATOR, name: 'Criador' },
    { value: RoleChoice.APPLICATOR, name: 'Aplicador' },
    { value: RoleChoice.ADMIN, name: 'Admin' },
    { value: RoleChoice.ANALYST, name: 'Analista' }
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
  ECHO_HELP = 1,
  PARTIAL_PHYSICAL_HELP = 2,
  TOTAL_PHYSICAL_HELP = 3,
  GESTURE_HELP = 4,
  INDEPENDENT = 5,
  NECESSARY_HELP = 6
}

export const helpTypeChoiceList = (): Choice[] => {
  return [
    { value: HelpTypeChoice.ECHO_HELP, name: 'Ajuda ecoica' },
    { value: HelpTypeChoice.PARTIAL_PHYSICAL_HELP, name: 'Ajuda física parcial' },
    { value: HelpTypeChoice.TOTAL_PHYSICAL_HELP, name: 'Ajuda física total' },
    { value: HelpTypeChoice.GESTURE_HELP, name: 'Ajuda gestual' },
    { value: HelpTypeChoice.INDEPENDENT, name: 'Independente (Sem Ajuda)' },
    { value: HelpTypeChoice.NECESSARY_HELP, name: 'Ajuda necessária' }
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
