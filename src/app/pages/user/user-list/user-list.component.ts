import { Component, OnInit, QueryList, ViewChildren } from '@angular/core'
import { Router } from '@angular/router'

import { NbDialogService, NbPopoverDirective } from '@nebular/theme'

import { UserService } from '../user.service'
import { User } from '../user.model'
import { ModalService } from '../../../modals/modal.service'

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChildren(NbPopoverDirective) popovers: QueryList<NbPopoverDirective>

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

  async removeUser(user: User) {
    await this.userService.deleteUser(user.id).toPromise()
    await this.getUsers()
  }

  goToUserForm(user: User) {
    this.router.navigateByUrl(`usuarios/formulario/${user.id}`)
  }

  showPopover(event: MouseEvent, i: number) {
    event.stopPropagation()
    const popArr = this.popovers.toArray()
    popArr.find(pop => pop.isShown)?.hide()
    popArr[i].show()
  }
}
