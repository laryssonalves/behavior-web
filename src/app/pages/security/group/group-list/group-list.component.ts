import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from '../../../../modals/modal.service';
import { User } from '../../user/user.model';
import { Group } from '../group.model';
import { GroupService } from '../group.service';

@Component({
  selector: 'ngx-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {
  @Input() private user: User

  groupList: Group[] = []
  isLoading = false

  constructor(private modalService: ModalService, private router: Router, private groupService: GroupService) {}

  async ngOnInit(): Promise<void> {
    await this.getGroups()
  }

  private async getGroups(): Promise<void> {
    try {
      this.isLoading = true
      this.groupList = await this.groupService.getGroupList().toPromise()
    } catch (e) {
      this.modalService.showDialogError(e)
    } finally {
      this.isLoading = false
    }
  }

  async removeGroup(group: Group, event?: MouseEvent) {
    event?.stopPropagation()
    await this.groupService.deleteGroup(group.id).toPromise()
    await this.getGroups()
  }

  goToGroupForm(group: Group) {
    this.router.navigateByUrl(`seguranca/grupos/formulario/${group.id}`)
  }

  checkUserPerm(perm: string): boolean {
    return this.user.hasPerms([perm])
  }
}
