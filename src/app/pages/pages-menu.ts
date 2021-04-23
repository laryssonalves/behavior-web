import { NbMenuItem } from '@nebular/theme'
import { User } from './security/user/user.model'

const MENU_COMPANY: NbMenuItem = {
  title: 'Instituição',
  icon: 'home-outline',
  link: '/empresa',
  home: true
}

const MENU_SECURITY: NbMenuItem = {
  title: 'Segurança',
  icon: 'shield-outline',
  link: '/seguranca'
}

const MENU_MEMBER: NbMenuItem = {
  title: 'Membros',
  icon: 'people-outline',
  link: '/membros'
}

const MENU_STUDENT: NbMenuItem = {
  title: 'Aprendentes',
  icon: 'book-outline',
  link: '/aprendentes'
}

export const MENU_ITEMS: NbMenuItem[] = [
  MENU_COMPANY,
  MENU_SECURITY,
  MENU_MEMBER,
  MENU_STUDENT
]

export function getMenuItemsByRole(user: User): NbMenuItem[] {
  const items = []

  if (user.hasPerms(['company_view'])) {
    items.push(MENU_COMPANY)
  }
  
  if (user.hasPerms(['user_view', 'group_view'])) {
    items.push(MENU_SECURITY)
  }

  if (user.hasPerms(['member_view'])){
    items.push(MENU_MEMBER)
  }

  if (user.hasPerms(['student_view'])){
    items.push(MENU_STUDENT)
  }
  
  return items
}

