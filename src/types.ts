export interface Authenticatable {
  isLoggedIn: () => Promise<boolean>
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export type InstagramPost = {
  like(): Promise<void>
}

export interface Instagram extends Authenticatable {
  saveLoginInfo: () => Promise<void>
  turnOffNotifications: () => Promise<void>
  login: (username: string, password: string) => Promise<void>
  like: (postId: string) => Promise<void>
  follow: (url: string) => Promise<void>
  unfollow: (url: string) => Promise<void>
  comment: (url: string, comment: string) => Promise<void>
  post: (url: string, post: string) => Promise<void>
  getFollowers: (url: string) => Promise<string[]>
  getFollowing: (url: string) => Promise<string[]>
  getPosts: (url: string) => Promise<string[]>
  getVisiblePosts: () => Promise<InstagramPost[]>
  createAccount: (fullName: string, username: string, password: string) => Promise<void>
}

export interface OnlyFans extends Authenticatable {}
