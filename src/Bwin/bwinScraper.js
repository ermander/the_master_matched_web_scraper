const fs = require("fs");

// Scraping functions
const tournamentScraper = require("./Scraping Functions/tournamentScraper");
const oddsScraper = require("./Scraping Functions/oddsScraper");

const bwinScraper = async (chrome, Builder, By, Capabilities, links, sleep) => {
  // Creating the chrome options
  const options = new chrome.Options();
  options.windowSize({ width: 1500, height: 850 });
  // Setting the strategies of the page load
  const caps = new Capabilities();
  caps.setPageLoadStrategy("normal");
  // Initiating selenium web driver
  let driver = await new Builder()
    .withCapabilities(caps)
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  // Opening Selenium
  await driver.manage().window();
  // Creating the array that will contain the infoes of all the GoldBet Soccer Matches
  let bwinOdds = [];

  // Looping throw all the links in order to open all of them
  for (let i = 0; i < links.length; i++) {
    // Opening a new windows tab
    await driver.switchTo().newWindow("tab");
    // Navigate to Url
    await driver.get(links[i]);
  }

  // Getting the id of all the tabs opened
  const allWindows = await driver.getAllWindowHandles();

  for (let i = 1; i < allWindows.length; i++) {
    await driver.switchTo().window(allWindows[i]);
    await sleep(100);
    console.log("Scraping:    ", await driver.getCurrentUrl());

    try {
      const sportAndNationLink = await driver.getCurrentUrl();
      const sportType = sportAndNationLink.split("sports/")[1].split("-")[0];
      const nation = sportAndNationLink.split("scommesse/")[1].split("-")[0];
      const tournament = await tournamentScraper(
        driver,
        By,
        "span.breadcrumb-title.ng-star-inserted"
      );
      const odds = await oddsScraper(driver, By, "div > ms-font-resizer");

      
    } catch (error) {
      console.log(error);
    }
    driver.close();
  }
  let bwinOddsFile = JSON.stringify(bwinOdds);
  fs.writeFileSync("sisal.json", bwinOddsFile);
  driver.quit();
  return bwinOddsFile;
};

module.exports = bwinScraper;
