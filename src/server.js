// Selenium
const { Builder, By, Capabilities } = require("selenium-webdriver");
const { JSDOM } = require("jsdom");

const { window } = new JSDOM();

// Scraping functions
const goldbetScraper = require("./GoldBet/goldbetScraper");
const eurobetScraper = require("./Eurobet/eurobetScraper");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const main = async () => {
  const start = window.performance.now();

  console.log("Starting scraping");

  // Scraping GoldBet
  // const goldbetOdds = await goldbetScraper(driver, By);
  // Scraping Eurobet
  let eurobetState = true;
  while (eurobetState) {
    const eurobetOdds = await eurobetScraper(Builder, By, Capabilities, sleep);
    if (eurobetOdds.error) {
      eurobetState = true;
      console.log("Ricomincio il ciclo di Eurobet");
    } else {
      //console.log(eurobetOdds);
      eurobetState = false;
      console.log("Ciclo Eurobet finito");
    }
  }

  const stop = window.performance.now();
  console.log(`Time Taken to execute = ${(stop - start) / 1000} seconds`);
};

main();
