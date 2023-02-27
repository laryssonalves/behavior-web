export class AuthToken {
  private refresh: string
  private access: string

  constructor(initialData: Partial<AuthToken>) {
    Object.assign(this, initialData)
  }

  isExpired(): boolean {
    const payload = JSON.parse(atob(this.access.split(".")[1]))
    const expires = new Date(payload.exp * 1000)
    // add 1 minute to account for network latency
    return new Date() > new Date(expires.getTime() + 60000)
  }

  isValid(): boolean {
    return !!this.getAccessToken() && !this.isExpired()
  }

  getAccessToken(): string {
    return this.access
  }

  getRefreshToken(): string {
    return this.refresh
  }
}