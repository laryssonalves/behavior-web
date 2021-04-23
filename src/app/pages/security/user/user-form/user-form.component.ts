import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'

import { UserService } from '../user.service'
import { ToastService } from '../../../../services/toast.service'

import { User } from '../user.model'
import { Member } from '../../../member/member.model'
import { MemberService } from '../../../member/member.service'
import { Group } from '../../group/group.model'
import { GroupService } from '../../group/group.service'

@Component({
  selector: 'ngx-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user = new User()
  memberList: Member[] = []
  groupList: Group[] = []
  confirmPassword: string
  personId: number
  formTitle = 'Adicionar usuário'

  isLoading = false

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
    private userService: UserService,
    private memberService: MemberService,
    private groupService: GroupService
  ) {}

  async ngOnInit() {
    await this.getMembers()
    await this.getGroups()
    await this.getUser()
  }

  private async getMembers() {
    this.memberList = await this.memberService.getMemberList().toPromise()
  }

  private async getGroups() {
    this.groupList = await this.groupService.getGroupList().toPromise()
  }

  async getUser() {
    const id = this.route.snapshot.paramMap.get('id')

    if (id) {
      this.user = await this.userService.getUser(id).toPromise()
      this.personId = this.user.person?.id
      this.formTitle = this.user.name
    }
  }

  async saveForm() {
    try {
      this.isLoading = true
      await this.saveUser()
      this.goBack()
    } catch (error) {
      this.user.errors = error.error
    } finally {
      this.isLoading = false
      this.toastService.showFormResponseToast(!this.user.errors, 'Usuário salvo com sucesso')
    }
  }

  async saveUser() {
    this.user.errors = null

    if (this.user.id) {
      this.user = await this.userService.updateUser(this.user).toPromise()
      this.userService.isNeededUpdateCurrentUser(this.user)
    } else {
      this.user = await this.userService.addUser(this.user).toPromise()
    }
  }

  goBack() {
    this.location.back()
  }

  onPersonChange() {
    const person = this.memberList.find(member => member.id === this.personId)

    this.user.person = person

    this.user.name = this.user.person?.name
    this.user.email = this.user.person?.email
  }

  onPasswordChange() {
    const passwordDivergingError = 'As senhas estão divergindo'
    const isPasswordDiverging = this.user.password !== this.confirmPassword
    const isUserErrorNotInitialized = !this.user.errors || !this.user.errors?.password

    if (isUserErrorNotInitialized) {
      this.user.errors = { password: [] }
    }

    const isPasswordErrorShowing = this.user.errors.password.includes(passwordDivergingError)

    if (isPasswordErrorShowing && isPasswordDiverging) {
      return
    }

    if (isPasswordDiverging) {
      this.user.errors.password.push(passwordDivergingError)
    } else {
      this.user.errors.password = this.user.errors.password.filter(error => error !== passwordDivergingError)
    }
  }
}
