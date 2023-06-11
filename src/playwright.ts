import { Locator, Page, chromium } from 'playwright'
import { Dict } from '.'

const { TEST_INSTAGRAM_USERNAME, TEST_INSTAGRAM_PASSWORD } =
  process.env as Dict<string>

async function getLoginButton(page: Page): Promise<Locator> {
  const loginButtonXpath = '//*[@id="loginForm"]/div/div[3]/button'

  const loginButtonInput = await page.locator(loginButtonXpath)

  return loginButtonInput
}

export async function isLoginPage(page: Page): Promise<boolean> {
  const loginButtonInput = await getLoginButton(page)

  return !!loginButtonInput
}

async function getPasswordInput(page: Page) {
  const passwordXpath = '//*[@id="loginForm"]/div/div[2]/div/label/input'

  const passwordInput = await page.locator(passwordXpath)

  return passwordInput
}

async function getUsernameInput(page: Page) {
  const userNameXpath = '//*[@id="loginForm"]/div/div[1]/div/label/input'

  const usernameInput = await page.locator(userNameXpath)

  return usernameInput
}

;(async () => {
  const browser = await chromium.launch({
    headless: false,
  })

  const context = await browser.newContext()

  const page = await context.newPage()

  await page.goto('https://instagram.com')

  if (await isLoginPage(page)) {
    const usernameInput = await getUsernameInput(page)
    const passwordInput = await getPasswordInput(page)
    const loginButtonInput = await getLoginButton(page)

    await usernameInput.type(TEST_INSTAGRAM_USERNAME)
    await passwordInput.type(TEST_INSTAGRAM_PASSWORD)

    await loginButtonInput.click()

    await page.waitForNavigation()
  } else {
    console.log('Is not login page')
  }

  // await page.screenshot({ path: 'example.png' })

  // const title = await page.title()
  // console.log('Page title:', title)

  // await browser.close()
})()
