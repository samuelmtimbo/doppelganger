import { ElementHandle, Page } from 'puppeteer'
import puppeteer from 'puppeteer-extra'

import { spawn } from 'child_process'

// @ts-ignore
// import puppeteer from 'puppeteer-firefox'
import dotenv from 'dotenv'
import { rootPath } from 'get-root-path'
import * as path from 'path'
// import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'

// import StealthPlugin from 'puppeteer-extra-plugin-stealth'

// puppeteer.use(StealthPlugin())
// puppeteer.use(AdblockerPlugin())

dotenv.config()

const userDataDir = path.join(rootPath, 'user')

console.log({ rootPath, userDataDir })

export type Dict<T> = Record<string, T>

const { TEST_INSTAGRAM_USERNAME, TEST_INSTAGRAM_PASSWORD } =
  process.env as Dict<string>

if (!TEST_INSTAGRAM_USERNAME || !TEST_INSTAGRAM_PASSWORD) {
  throw new Error(
    'TEST_INSTAGRAM_USERNAME or TEST_INSTAGRAM_PASSWORD is not defined'
  )
}

async function getPasswordInput(page: Page) {
  const passwordXpath = '//*[@id="loginForm"]/div/div[2]/div/label/input'

  const passwordInput = await page.$x(passwordXpath)
  return passwordInput[0]
}

async function getUsernameInput(page: Page) {
  const userNameXpath = '//*[@id="loginForm"]/div/div[1]/div/label/input'

  const usernameInput = await page.$x(userNameXpath)

  return usernameInput[0]
}

async function clickOnScreen(x: number, y: number) {
  spawn('./click.o', [x.toString(), y.toString()], {})
}

async function getLoginButton(page: Page): Promise<ElementHandle<Element>> {
  const loginButtonXpath = '//*[@id="loginForm"]/div/div[3]/button'

  const loginButtonInput = await page.$x(loginButtonXpath)

  return loginButtonInput[0] as ElementHandle<Element>
}

const turnOnNotificationsButtonXpath =
  '//*/div/div/div[3]/div/div/div[1]/div/div[2]/div/div/div/div/div[2]/div/div/div[3]/button[1]'

async function getTurnOnNotificationsButton(page: Page) {
  const turnOnNotificationsButtonInput = await page.$x(
    turnOnNotificationsButtonXpath
  )

  return turnOnNotificationsButtonInput[0]
}

async function hasElement(page: Page, xPath: string) {
  const element = getFirstElement(page, xPath)

  return !!element
}

async function getFirstElement(
  page: Page,
  xPath: string
): Promise<ElementHandle<Element>> {
  const element = await page.$x(xPath)

  return element[0] as ElementHandle<Element>
}

async function clickOnElementIfExists(page: Page, xPath: string) {
  const element = await getFirstElement(page, xPath)

  if (element) {
    return await element.click()
  }

  console.log('Element does not exist')
}

export async function hasTurnOnNotificationsButton(page: Page) {
  const turnOnNotificationsButton = await getTurnOnNotificationsButton(page)

  return !!turnOnNotificationsButton
}

export async function isLoginPage(page: Page): Promise<boolean> {
  const loginButtonInput = await getLoginButton(page)

  return !!loginButtonInput
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function randomRangeSleep(min: number, max: number) {
  const random = Math.floor(Math.random() * (max - min)) + min

  await sleep(random)
}

const INSTAGRAM_HOSTNAME = 'https://instagram.com'

async function runPuppeteer() {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true,
    userDataDir,
    defaultViewport: {
      width: 390,
      height: 844,
    },
    // product: 'firefox',
    // args: ['--disable-features=NotificationTriggers'],
    // @ts-ignore
    // permissions: ['notifications'],
  })

  const context = browser.defaultBrowserContext()

  context.overridePermissions(INSTAGRAM_HOSTNAME, [
    'geolocation',
    'notifications',
  ])

  const pages = await browser.pages()

  // const page = await browser.newPage()
  const page = pages[0]

  page.on('dialog', async (dialog: any) => {
    console.log(`Dialog type: ${dialog.type()}`)
    console.log(`Dialog message: ${dialog.message()}`)

    await dialog.accept()
  })

  try {
    await page.goto(INSTAGRAM_HOSTNAME, {
      waitUntil: 'networkidle0',
    })

    if (await isLoginPage(page)) {
      const usernameInput = await getUsernameInput(page)
      const passwordInput = await getPasswordInput(page)
      const loginButtonInput = await getLoginButton(page)

      await usernameInput.type(TEST_INSTAGRAM_USERNAME)
      await passwordInput.type(TEST_INSTAGRAM_PASSWORD)

      await loginButtonInput.click()

      await page.waitForNavigation()
    } else {
      await clickOnElementIfExists(page, turnOnNotificationsButtonXpath)

      await sleep(1000)

      // clickOnScreen(280, 210)
    }
  } catch (error) {
    console.error('An error occurred:', error)
  } finally {
    // Close the browser
    // await browser.close()
  }
}

runPuppeteer()
