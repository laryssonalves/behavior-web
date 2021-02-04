import { Component, OnInit } from '@angular/core'

import { Member } from '../member.model'
import { MemberService } from '../member.service'
import { GlobalAction } from '../../../action-abstract'
import { ErrorModalComponent } from '../../../modals/error-modal/error-modal'
import { NbDialogService } from '@nebular/theme/'

@Component({
  selector: 'ngx-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: [ './member-list.component.scss' ]
})
export class MemberListComponent extends GlobalAction implements OnInit {
  memberList: Member[] = []

  private loading = false

  constructor(private memberService: MemberService, private nbDialogService: NbDialogService) {
    super()
  }

  async ngOnInit(): Promise<void> {
    await this.getMembers()

    const refreshList = this.memberService.refreshMemberList.subscribe(async () => { await this.getMembers() })

    this.subscription.add(refreshList)
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

  removeMember(member: Member) {
    this.memberService.deleteMember(member.id)
  }

  get showLoading(): boolean {
    return this.loading
  }

  set showLoading(loading: boolean) {
    this.loading = loading
  }

  private openDialogError(error: any) {
    this.nbDialogService.open(
      ErrorModalComponent,
      { context: { error: error }, hasScroll: true, dialogClass: 'basic-modal' }
    )
  }
}
