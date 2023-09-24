import { createNewBrowserPage } from './createNewBrowserPage'
import { Dict, makeInstagramPageAPI, sleep } from './provider/instagram'
import dotenv from 'dotenv'

dotenv.config()

const { TEST_INSTAGRAM_USERNAME, TEST_INSTAGRAM_PASSWORD } =
  process.env as Dict<string>

export async function openInstagramAndLikeAllVisiblePosts() {
  const page = await createNewBrowserPage('drukpa', 'https://instagram.com')

  const instagram = makeInstagramPageAPI(page)

  const loggedIn = await instagram.isLoggedIn()

  if (!loggedIn) {
    // await instagram.login(TEST_INSTAGRAM_USERNAME, TEST_INSTAGRAM_PASSWORD)
  }

  await instagram.saveLoginInfo()

  await sleep(3000)

  await instagram.turnOffNotifications()

  const posts = await instagram.getVisiblePosts()

  for (const post of posts) {
    await post.like()
  }
}

export async function openInstagramAndCreateNewAccount() {
  const page = await createNewBrowserPage('new', 'https://instagram.com')

  const instagram = makeInstagramPageAPI(page)

  await instagram.createAccount('drukpa', 'drukpa', 'drukpa')
}

openInstagramAndCreateNewAccount()

// openInstagramAndLikeAllVisiblePosts()
