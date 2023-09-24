import dotenv from 'dotenv'
import { Dict } from './provider/instagram'

dotenv.config()

const { TEST_INSTAGRAM_USERNAME, TEST_INSTAGRAM_PASSWORD } =
  process.env as Dict<string>

export const APP_NAME_TO_HOSTNAME = {
  instagram: 'instagram.com',
  onlyfans: 'onlyfans.com',
  twitter: 'twitter.com',
}

export type AppName = 'instagram' | 'onlyfans' | 'twitter'

export type Doppe = {
  app: AppName
  username: string
  password: string
}

const doppeList: Doppe[] = []

export async function main() {
  // when I run this we will spawn many bots, for each app, for each user
}

main()
