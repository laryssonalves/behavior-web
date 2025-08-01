import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';

import { ToastService } from '../../../../services/toast.service';
import { Permission } from '../../interfaces/permission'
import { Group } from '../group.model';
import { GroupService } from '../group.service';
import { PermissionService } from '../../permission.service';
import { roleChoiceList } from '../../../../models/choice.model';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.model';
import { GlobalAction } from '../../../../action-abstract';


@Component({
  selector: 'ngx-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent extends GlobalAction implements OnInit, OnDestroy {
  private loggedUser: User

  group = new Group()
  permissionList: Permission[] = []
  defaultPermissionList: string[] = []
  checkedPermissionList: string[] = []
  nodeList: any[] = []
  roleChoices = roleChoiceList()

  formTitle = 'Adicionar grupo'

  isLoading = false

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private toastService: ToastService,
    private groupService: GroupService,
    private permissionService: PermissionService,
    private userService: UserService
  ) { super() }

  async ngOnInit(): Promise<void> {
    await this.getPermissions()
    await this.getGroup()
    this.getLoggedUser()
  }

  ngOnDestroy() {
    super.ngOnDestroy()
  }

  private async getPermissions() {
    this.permissionList = await this.permissionService.getPermissionList().toPromise()
    this.permissionListToNodes()
  }

  private async getGroup() {
    const id = this.route.snapshot.paramMap.get('id')

    if (id) {
      this.group = await this.groupService.getGroup(id).toPromise()
      this.formTitle = this.group.name
      this.defaultPermissionList = this.group.permissions
      this.checkedPermissionList = this.group.permissions
    }
  }

  private getLoggedUser() {
    const userSubscription = this.userService.userSubject.subscribe(user => (this.loggedUser = user))
    this.subscription.add(userSubscription)
  }

  async saveForm() {
    try {
      this.isLoading = true
      this.group.errors = null
      await this.saveGroup()
      this.goBack()
    } catch (error) {
      this.group.errors = error.error
    } finally {
      this.isLoading = false
      this.toastService.showFormResponseToast(!this.group.errors, 'Grupo salvo com sucesso')
    }
  }

  private async saveGroup() {
    this.group.permissions = this.checkedPermissionList

    if (this.group.id) {
      this.group = await this.groupService.updateGroup(this.group).toPromise()
      this.userService.getUserDetails()
    } else {
      this.group = await this.groupService.addGroup(this.group).toPromise()
    }
  }

  goBack(): void {
    this.location.back()
  }

  private permissionListToNodes(): void {
    const companyPermissions = this.permissionList.filter(perm => perm.codename.startsWith('company'))
    const securityPermissions = this.permissionList.filter(perm => perm.codename.startsWith('user') || perm.codename.startsWith('group'))
    const memberPermissions = this.permissionList.filter(perm => perm.codename.startsWith('member'))
    const studentPermissions = this.permissionList.filter(perm => perm.codename.startsWith('student') && !perm.codename.includes('exercise') && !perm.codename.includes('member'))
    const exercisePermissions = this.permissionList.filter(perm => perm.codename.startsWith('student_exercise'))
    const teamPermissions = this.permissionList.filter(perm => perm.codename.startsWith('student_member'))
    const consultationPermissions = this.permissionList.filter(perm => perm.codename.startsWith('consultation'))

    this.createNode('Empresa', 'company', companyPermissions)
    this.createNode('Segurança', 'security', securityPermissions)
    this.createNode('Membros', 'member', memberPermissions)
    this.createNode('Aprendentes', 'student', studentPermissions)
    this.createNode('Programas de Ensino', 'student_exercise', exercisePermissions)
    this.createNode('Equipe', 'student_member', teamPermissions)
    this.createNode('Atendimentos', 'consultation', consultationPermissions)

    console.log(this.nodeList)
  }

  private createNode(title: string, key: string, perms: Permission[]): void {
    const node = {
      title,
      key,
      children: perms.map(perm => {
          return {
          title: perm.name,
          key: perm.id,
          isLeaf: true,
        }
      })
    }

    this.nodeList.push(node)
  }

  onPermissionCheckboxChange(event: NzFormatEmitEvent): void {
    const {isLeaf, isChecked, key, children} = event.node

    if (isLeaf) {
      this.checkChildPermission(key, isChecked)
    } else {
      children.forEach(childNode => this.checkChildPermission(childNode.key, isChecked))
    }
  }

  private checkChildPermission(key: string, isChecked: boolean): void {
    if (isChecked) {
      this.checkedPermissionList.push(key)
    } else {
      this.checkedPermissionList = this.checkedPermissionList.filter(permId => permId !== key)
    }
  }

  checkUserPerm(perm: string) {
    return this.loggedUser?.hasPerms([perm])
  }
}
