// Selenium
const { Builder, By, Capabilities } = require("selenium-webdriver");
const { JSDOM } = require("jsdom");

// Chrome options
const chrome = require("selenium-webdriver/chrome");
const options = new chrome.Options();
const caps = new Capabilities();
caps.setPageLoadStrategy("eager");

const { window } = new JSDOM();

// Scraping functions
// GoldBet
const goldbetScraper = require("./GoldBet/goldbetScraper");

const main = async () => {
  while (true) {
    const start = window.performance.now();
    // Initiating selenium web driver
    let driver = await new Builder()
      .withCapabilities(caps)
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    console.log("Starting scraping");
    await driver.manage().window().setRect({ width: 1500, height: 980 });
    const serieAOdds = await goldbetScraper(driver, By);
    console.log(serieAOdds);
    const stop = window.performance.now();
    console.log(`Time Taken to execute = ${(stop - start) / 1000} seconds`);
  }
};

main();
