const puppeteer = require('puppeteer');
const dotenv = require('dotenv');

dotenv.config();

const { USER = "USERNAME", PASS = "PASSWORD", IS_THREE_ADVISOR = false } = process.env;

(async () => {

  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage()
  
  await page.goto('https://gitdev.mwit.ac.th/hrmwit/login')

  await page.waitForSelector('body > .screenpage > .is-fixed > .form > #username')
  await page.type('body > .screenpage > .is-fixed > .form > #username', USER)

  await page.waitForSelector('body > .screenpage > .is-fixed > .form > #password')
  await page.type('body > .screenpage > .is-fixed > .form > #password', PASS)

  await page.waitFor(2000)

  await page.waitForSelector('body > .screenpage > .is-fixed > .form > .login-submit')
  await page.click('body > .screenpage > .is-fixed > .form > .login-submit')

  await page.waitFor(500)

  await page.waitForSelector('.app-container > .sidebar > .menu > .is-flex-center > span:nth-child(1)')
  await page.click('.app-container > .sidebar > .menu > .is-flex-center > span:nth-child(1)')
  
  await page.waitForSelector('.sidebar > .menu > .submenu > a > span:nth-child(2)')
  await page.click('.sidebar > .menu > .submenu > a > span:nth-child(2)')
  
  await page.waitFor(2000)

  var i, j;

  // Advisor
  console.log('>> Starting evaluate advisor')
  for(i = 1 ; i <= 3 ; i++) {
    if(IS_THREE_ADVISOR == false && i == 3) {
      break;
    } else {
      if (await page.$('#root > section > div.app-container > div > div:nth-child(3) > div:nth-child(' + i + ') > div > div > a') === null) {
        continue;
      } else {
        console.log('Before Press Button 3:' + i)
        await page.click('#root > section > div.app-container > div > div:nth-child(3) > div:nth-child(' + i + ') > div > div > a')

        console.log('After Press Button')

        await page.waitForSelector('.table > tbody > tr:nth-child(1) > td:nth-child(6) > input')

        console.log('Radio')
        await page.click('.table > tbody > tr:nth-child(1) > td:nth-child(6) > input')

        console.log('Radio')      
        await page.click('.table > tbody > tr:nth-child(2) > td:nth-child(6) > input')

        console.log('Radio')
        await page.click('.table > tbody > tr:nth-child(3) > td:nth-child(6) > input')

        console.log('Radio')
        await page.click('.table > tbody > tr:nth-child(4) > td:nth-child(6) > input')

        console.log('Radio')
        await page.click('.table > tbody > tr:nth-child(5) > td:nth-child(6) > input')

        await page.waitFor(500)

        console.log('Before submit')
        await page.click('.app-view > .field > .control:nth-child(1) > .button > .icon')
        console.log('After submit')

        await page.waitFor(1500)
      }
    }
  }

  // Lecturer
  console.log('>> Starting evaluate lecturer')
  for(i = 3 ; i < 10 ; i++) {
    for(j = 1 ; j <= 3 ; j++) {
      if((i == 3 && j == 1) || (i == 3 && j == 2) || (i == 3 && IS_THREE_ADVISOR == true)) {
        continue;
      } else {
        if (await page.$('#root > section > div.app-container > div > div:nth-child(' + i + ') > div:nth-child(' + j + ') > div > div > a') === null) {
          continue;
        } else {
          console.log('Before Press Button ' + i + ':' + j)
          await page.click('#root > section > div.app-container > div > div:nth-child(' + i + ') > div:nth-child(' + j + ') > div > div > a')

          console.log('After Press Button')

          await page.waitForSelector('.table > tbody > tr:nth-child(1) > td:nth-child(6) > input')

          console.log('Radio')
          
          await page.click('.table > tbody > tr:nth-child(1) > td:nth-child(6) > input')
          console.log('Radio')
          
          await page.click('.table > tbody > tr:nth-child(2) > td:nth-child(6) > input')
          console.log('Radio')
          
          await page.click('.table > tbody > tr:nth-child(3) > td:nth-child(6) > input')
          console.log('Radio')
          
          await page.click('.table > tbody > tr:nth-child(4) > td:nth-child(6) > input')
          console.log('Radio')
          
          await page.click('.table > tbody > tr:nth-child(5) > td:nth-child(6) > input')
          console.log('Radio')
          
          await page.click('.table > tbody > tr:nth-child(6) > td:nth-child(6) > input')
          console.log('Radio')
          
          await page.click('.table > tbody > tr:nth-child(7) > td:nth-child(6) > input')
          console.log('Radio')
          
          await page.click('.table > tbody > tr:nth-child(8) > td:nth-child(6) > input')
          console.log('Radio')
          
          await page.click('.table > tbody > tr:nth-child(9) > td:nth-child(6) > input')
          console.log('Radio')
          
          await page.click('.table > tbody > tr:nth-child(10) > td:nth-child(6) > input')
          console.log('Radio')

          await page.waitFor(500)
          
          console.log('Before submit')
          await page.click('.app-view > .field > .control:nth-child(1) > .button > .icon')
          console.log('After submit')

          await page.waitFor(1500)
        }
      }
    }
  }
  
  console.log('>> Done!')
  await browser.close()
})()