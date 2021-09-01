const fs = require("fs");

// Scraping funcionts
const sportNationTournamentScraper = require("./Scraping Functions/sportNationTournamentScraper");
const startDayScraper = require("./Scraping Functions/startDayScraper");
const homeAwayScraper = require("./Scraping Functions/homeAwayScraper");
const startTimeScraper = require("./Scraping Functions/startTimeScraper");
const oneXTwoOddsScraper = require("./Scraping Functions/oneXTwoOddsScraper");

const planetwin365Scraper = async (
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
  let planetwin365Odds = [];

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
      // Sport, Nation and Tournament
      const sportNationTournament = await sportNationTournamentScraper(
        driver,
        By,
        "lblTitolo"
      );
      // Start Day
      const startDays = await startDayScraper(driver, By, "cqDateTbl");
      // Start time
      const startTimes = await startTimeScraper(driver, By, "dtInc");
      // Home and away
      const homeAway = await homeAwayScraper(
        driver,
        By,
        "td.nmInc > div > span"
      );
      // All Odds (1X2, 1X 12 X2, U/O2.5, GG/NG)
      const oneXTwoOdds = await oneXTwoOddsScraper(driver, By, "div.oddsQ > a");

      // Inserting the start time and the start day
      let boxesDividedForDay = await driver.findElements(
        By.css("div.divQt > table")
      );
      let numberOfMatchPerDayArray = [];
      let temporaryOdds = [];

      for (let i = 0; i < boxesDividedForDay.length; i++) {
        numberOfMatchPerDay = await boxesDividedForDay[i].findElements(
          By.css("tr.dgAItem")
        );
        numberOfMatchPerDayArray.push(numberOfMatchPerDay.length);
      }

      // Adding the start day
      for (let i = 0; i < boxesDividedForDay.length; i++) {
        for (let j = 0; j < numberOfMatchPerDayArray[i]; j++) {
          let match_info = {
            start_day: startDays[i],
            start_time: startTimes[i],
          };
          temporaryOdds.push(match_info);
        }
      }
      temporaryOdds = temporaryOdds.map((odd, i) => {
        return {
          ...odd,
          sport_type: sportNationTournament.sportType,
          nation: sportNationTournament.nation,
          tournament: sportNationTournament.tournament,
          home: homeAway.home[i],
          away: homeAway.away[i],
          one: oneXTwoOdds.oneOdds[i],
          x: oneXTwoOdds.xOdds[i],
          two: oneXTwoOdds.twoOdds[i],
          one_x: oneXTwoOdds.oneXOdds[i],
          one_two: oneXTwoOdds.oneTwoOdds[i],
          x_two: oneXTwoOdds.xTwoOdds[i],
          under_1_5: oneXTwoOdds.under_1_5Odds[i],
          over_1_5: oneXTwoOdds.over_1_5Odds[i],
          under_2_5: oneXTwoOdds.under_2_5Odds[i],
          over_2_5: oneXTwoOdds.over_2_5Odds[i],
          goal: oneXTwoOdds.goalOdds[i],
          no_goal: oneXTwoOdds.noGoalOdds[i],
        };
      });
      planetwin365Odds = [...planetwin365Odds, ...temporaryOdds];
      console.log(temporaryOdds)
    } catch (error) {
      console.log(error);
      return error;
    }
    driver.close();
  }
  let planetwin365OddsFile = JSON.stringify(planetwin365Odds);
  fs.writeFileSync("planetwin365Odds.json", planetwin365OddsFile);
  driver.quit();
  return planetwin365Odds;
};

module.exports = planetwin365Scraper;
