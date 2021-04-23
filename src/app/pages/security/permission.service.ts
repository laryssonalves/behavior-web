import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Permission } from './interfaces/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private permissionUrl = `${environment.apiUrl}permissions/`
  
  constructor(private httpClient: HttpClient) {}

  getPermissionList(): Observable<Permission[]> {
    return this.httpClient.get<Permission[]>(this.permissionUrl).pipe(
      map(permissions => permissions.map(permission => permission as Permission))
    )
  }
}
