const chrome = require('@sparticuz/chromium')
const puppeteer = require('puppeteer-core')

export default async (req, res) => {
  let { method } = req

  if (method !== 'POST') {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    return res.status(200).end()
  }

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

    await page.goto('https://www.google.com');

    await browser.close()

    res.status(200).send('Successfully navigated to Google homepage')
  } catch (error) {
    if (browser) await browser.close()
    console.error('Error:', error)
    res.status(500).send('Internal Server Error')
  }
}
