import { OnlyFans } from '../../types'

export const api: OnlyFans = {
  login: function (username: string, password: string): Promise<void> {
    throw new Error('Function not implemented.')
  },
  logout: function (): Promise<void> {
    throw new Error('Function not implemented.')
  },
  isLoggedIn: function (): Promise<boolean> {
    throw new Error('Function not implemented.')
  }
}
