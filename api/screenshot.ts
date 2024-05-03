const chrome = require('@sparticuz/chromium')
const puppeteer = require('puppeteer-core')

export default async (req, res) => {
  let { method } = req

  if (method === 'GET') {
    let browser

    try {
      browser = await puppeteer.launch({
        args: chrome.args,
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath(),
        headless: 'new',
        ignoreHTTPSErrors: true
      })

      const page = await browser.newPage()

      await page.goto('https://twitter.com/realPengLoo');

      await browser.close()

      res.status(200).send('Successfully navigated to Twitter profile')
    } catch (error) {
      if (browser) await browser.close()
      console.error('Error:', error)
      res.status(500).send('Internal Server Error')
    }
  } else {
    res.status(405).send('Method Not Allowed')
  }
}
