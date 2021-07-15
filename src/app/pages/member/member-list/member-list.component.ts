import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Member } from '../member.model'
import { MemberService } from '../member.service'
import { GlobalAction } from '../../../action-abstract'
import { ErrorModalComponent } from '../../../modals/error-modal/error-modal'
import { NbDialogService } from '@nebular/theme/'
import { User } from '../../security/user/user.model'
import { UserService } from '../../security/user/user.service'

@Component({
  selector: 'ngx-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent extends GlobalAction implements OnInit {
  memberList: Member[] = []

  private user: User
  private loading = false

  constructor(
    private router: Router, 
    private memberService: MemberService, 
    private nbDialogService: NbDialogService,
    private userService: UserService
  ) {
    super()
  }

  get showLoading(): boolean {
    return this.loading
  }

  set showLoading(loading: boolean) {
    this.loading = loading
  }

  async ngOnInit(): Promise<void> {
    await this.getMembers()

    const refreshList = this.memberService.refreshMemberList.subscribe(async () => {
      await this.getMembers()
    })

    const userSubscription = this.userService.userSubject.subscribe(user => (this.user = user))

    this.subscription.add(userSubscription)
    this.subscription.add(refreshList)
  }

  removeMember(member: Member) {
    this.memberService.deleteMember(member.id)
  }

  private async getMembers() {
    try {
      this.showLoading = true
      this.memberList = await this.memberService.getMemberList().toPromise()
    } catch (e) {
      this.openDialogError(e)
    } finally {
      this.showLoading = false
    }
  }

  goToMemberForm(member: Member) {
    this.router.navigateByUrl(`membros/formulario/${member.id}`)
  }

  private openDialogError(error: any) {
    this.nbDialogService.open(ErrorModalComponent, {
      context: { error: error },
      hasScroll: true,
      dialogClass: 'basic-modal'
    })
  }
  
  checkUserPerm(perm: string) {
    return this.user?.hasPerms([perm])
  }
}
