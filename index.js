const { Builder, Browser, Key, By } = require('selenium-webdriver')

class Crawler {
  url
  constructor(url) {
    this.url = url
  }

  async collect() {
    const driver = await new Builder().forBrowser(Browser.CHROME).build()
    const listGameAwards = []
    try {
      await driver.get(this.url)
      await driver.sleep(1000)
      const yearElements = await driver.findElements(By.xpath('//th/a'))
      const gameNameElements = await driver.findElements(By.xpath('//*[@style="background:#FAEB86"]/i/b/a'))
      const developerElements = await driver.findElements(
        By.xpath('//*[@style="background:#FAEB86"][2]//b/a')
      )
      const publisherElements = await driver.findElements(
        By.xpath('//*[@style="background:#FAEB86"][3]//b/a')
      )
      yearElements.forEach(async (element, i) => {
        const year = await element.getText()
        const name = await gameNameElements[i].getText()
        const developer = await developerElements[i].getText()
        const publisher = await publisherElements[i].getText()
        listGameAwards.push({ name, developer, publisher, year })
      })
      await driver.sleep(500)
    } finally {
      await driver.quit()
    }

    console.table(listGameAwards)
  }
}

const crawler = new Crawler('https://pt.wikipedia.org/wiki/The_Game_Award_de_Jogo_do_Ano#D%C3%A9cada_de_2020')
crawler.collect()
