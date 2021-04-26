import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { UserService } from '../user.service'
import { User } from '../user.model'
import { ModalService } from '../../../../modals/modal.service'

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() private user: User
  
  userList: User[] = []
  isLoading = false

  constructor(private modalService: ModalService, private router: Router, private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    await this.getUsers()
  }

  private async getUsers(): Promise<void> {
    try {
      this.isLoading = true
      this.userList = await this.userService.getUserList().toPromise()
    } catch (e) {
      this.modalService.showDialogError(e)
    } finally {
      this.isLoading = false
    }
  }

  async removeUser(user: User, event?: MouseEvent) {
    event?.stopPropagation()
    await this.userService.deleteUser(user.id).toPromise()
    await this.getUsers()
  }

  goToUserForm(user: User) {
    this.router.navigateByUrl(`seguranca/usuarios/formulario/${user.id}`)
  }

  checkUserPerm(perm: string): boolean {
    return this.user.hasPerms([perm])
  }
}
