// Selenium
const { Builder, By, Capabilities } = require("selenium-webdriver");
const { JSDOM } = require("jsdom");

// Chrome options
const chrome = require("selenium-webdriver/chrome");
const options = new chrome.Options();
// options.headless()

const { window } = new JSDOM();

// Scraping functions
const goldbetScraper = require("./GoldBet/goldbetScraper");
const eurobetScraper = require("./Eurobet/eurobetScraper");

const main = async () => {
  const start = window.performance.now();
  // Initiating selenium web driver
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  console.log("Starting scraping");
  // Setting the page size
  await driver.manage().window().setRect({ width: 800, height: 750 });
  // Scraping GoldBet
  // const goldbetOdds = await goldbetScraper(driver, By);
  // Scraping Eurobet
  const eurobetOdds = await eurobetScraper(driver, By);
  //console.log(eurobetOdds)

  const stop = window.performance.now();
  console.log(`Time Taken to execute = ${(stop - start) / 1000} seconds`);
};

main();
