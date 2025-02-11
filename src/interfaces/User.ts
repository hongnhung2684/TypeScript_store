export interface User {
  id?: number | string
  email: string
  password: string
  role: 'admin' | 'member'
}
