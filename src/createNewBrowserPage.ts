import { makeUserDataDir } from './provider/instagram'
import puppeteer, { Page } from 'puppeteer'

export async function createNewBrowserPage(
  master: string,
  hostname: string
): Promise<Page> {
  const userDataDir = makeUserDataDir(master)

  const browser = await puppeteer.launch({
    headless: false,
    devtools: false,
    userDataDir,
    defaultViewport: {
      width: 390,
      height: 844,
    },
  })

  // const context = browser.defaultBrowserContext();

  // context.overridePermissions(hostname, ['geolocation', 'notifications']);

  const pages = await browser.pages()

  const page = pages[0]

  await page.goto(hostname, {
    waitUntil: 'networkidle0',
  })

  return page
}
