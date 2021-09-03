const fs = require("fs"); // JSDOM library.
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();

// Scraping Functions
const matchNamesScraper = require("./Scraping Functions/matchNamesScraper");
const oddsScraper = require("./Scraping Functions/oddsScraper");
const daysAndTimesScraper = require("./Scraping Functions/daysAndTimesScraper");
const sportNationTournamentScraper = require("./Scraping Functions/sportNationTournamentScraper");

const goldbetScraper = async (
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
  options.headless();
  // Setting the strategies of the page load
  const caps = new Capabilities();
  caps.setPageLoadStrategy("eager");

  // Initiating selenium web driver
  let driver = await new Builder()
    .withCapabilities(caps)
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  // Opening Selenium
  await driver.manage().window();

  // Creating the array that will contain the infoes of all the GoldBet Soccer Matches
  let goldbetOdds = [];

  for (let i = 0; i < links.length; i++) {
    try {
      const start = window.performance.now();
      await driver.get(links[i]);
      await sleep(50);
      console.log("Scraping:    ", await driver.getCurrentUrl());
      
      // Sport type, nation and tournament
      const sportNationTournament = await sportNationTournamentScraper(
        driver,
        By,
        "brbs breadcrumbs",
        "li"
      );
      // Days and times
      const daysAndTimes = await daysAndTimesScraper(
        driver,
        By,
        "tr[data-evndate]"
      );
      // Match names
      const matchNames = await matchNamesScraper(driver, By, "eventClick");
      // Odds
      const odds = await oddsScraper(driver, By, "odd default ");

      for (let i = 0; i < daysAndTimes.days.length; i++) {
        const matchInfo = {
          sport_type: sportNationTournament.sportType,
          nation: sportNationTournament.nation,
          tournament: sportNationTournament.tournament,
          start_day: daysAndTimes.days[i],
          start_time: daysAndTimes.times[i],
          home: matchNames.homes[i],
          away: matchNames.aways[i],
          one: odds.oneOdds[i],
          x: odds.xOdds[i],
          two: odds.twoOdds[i],
          oneX: odds.oneXOdds[i],
          oneTwo: odds.oneTwoOdds[i],
          xTwo: odds.xTwoOdds[i],
          under2_5: odds.under2_5Odds[i],
          over2_5: odds.over2_5Odds[i],
          goal: odds.goalOdds[i],
          no_goal: odds.noGoalOdds[i],
        };

        goldbetOdds.push(matchInfo);
      }
      const stop = window.performance.now();
      console.log(`Time Taken to execute = ${(stop - start) / 1000} seconds`);
    } catch (error) {}
  }
  const goldbetOddsFile = JSON.stringify(goldbetOdds);
  return goldbetOddsFile;
};

module.exports = goldbetScraper;
