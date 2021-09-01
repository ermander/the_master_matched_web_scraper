const fs = require("fs");

// Scraping Functions
const timesAndDaysScraper = require("./Scraping Functions/timesAndDaysScraper");
const matchNamesScraper = require("./Scraping Functions/matchNamesScraper");
const oneXTwoScraper = require("./Scraping Functions/oneXTwoScraper");
const otherOddsScraper = require("./Scraping Functions/otherOddsScraper");
const nationTournamentSportScraper = require("./Scraping Functions/nationTournamentSportScraper");

const marathonbetScraper = async (
  chrome,
  Builder,
  By,
  Capabilities,
  links,
  sleep
) => {
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
  let marathonbetOdds = [];

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
      // Start times and days
      const timesAndDays = await timesAndDaysScraper(
        driver,
        By,
        "date date-short"
      );
      let nationTournamentSport = await nationTournamentSportScraper(
        driver,
        By,
        "h1.category-label > span:nth-child(1)",
        "h1.category-label > span:nth-child(2)",
        "sport-category-label"
      );
      // Match names
      const matchNames = await matchNamesScraper(
        driver,
        By,
        "a.member-link > span"
      );
      // One, X, Two odds
      const oneXTwoOdds = await oneXTwoScraper(
        driver,
        By,
        "selection-link active-selection  "
      );
      // Other Odds
      const otherOdds = await otherOddsScraper(
        driver,
        By,
        matchNames,
        nationTournamentSport.nation,
        nationTournamentSport.tournament
      );
    } catch {
      console.log(error);
      return error;
    }
  }
};

module.exports = marathonbetScraper;
