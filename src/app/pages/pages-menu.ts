import { NbMenuItem } from '@nebular/theme'
import { RoleChoice } from '../models/choice.model'

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Instituição',
    icon: 'home-outline',
    link: '/empresa',
    home: true
  },
  {
    title: 'Segurança',
    icon: 'shield-outline',
    link: '/seguranca'
  },
  {
    title: 'Membros',
    icon: 'people-outline',
    link: '/membros'
  },
  {
    title: 'Aprendentes',
    icon: 'book-outline',
    link: '/aprendentes'
  }
]

export function getMenuItemsByRole(role: RoleChoice): NbMenuItem[] {
  switch (role) {
    case RoleChoice.APPLICATOR:
      return MENU_ITEMS.filter(menuItem => menuItem.link === '/aprendentes')
    default:
      return MENU_ITEMS
  }
}
