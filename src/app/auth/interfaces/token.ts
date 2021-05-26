import { Observable, of } from "rxjs"

export class AuthToken {
  private readonly token: string
  private createdAt?: Date

  constructor(initialData: Partial<AuthToken>) {
    Object.assign(this, initialData)
  }

  isValid(): boolean {
    return !!this.getValue()
  }

  getValue(): string {
    return this.token
  }

  isAutheticated(): Observable<boolean> {
    return of(this.isValid())
  }
}