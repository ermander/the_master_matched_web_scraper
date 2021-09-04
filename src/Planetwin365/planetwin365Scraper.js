const fs = require("fs");

// Scraping funcionts
const startDaysTimesAndMatchNamesScraper = require("./Scraping Functions/startDaysTimesAndMatchNamesScraper");
const oddsScraper = require("./Scraping Functions/oddsScraper");

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
  //options.headless();

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
  let planetwin365Odds = [];

  for (let i = 0; i < links.length; i++) {
    try {
      await driver.get(links[i]);
      await sleep(50);
      console.log("Scraping:    ", await driver.getCurrentUrl());

      // Sport type
      let sportType = links[i].split("/")[5];
      let sportTypeCapitalized = sportType.charAt(0).toUpperCase();
      sportType = sportTypeCapitalized + links[i].split("/")[5].slice(1);

      // Nation
      let nation = links[i].split("/")[6];
      let nationCapitalized = nation.charAt(0).toUpperCase();
      nation = nationCapitalized + links[i].split("/")[6].slice(1);

      // Tournament
      let tournament = links[i].split("/")[7].split("-");
      let splitCondition = links[i].split("/")[7].split("-");
      if (splitCondition.length >= 3) {
        let firstCap = splitCondition[1].charAt(0).toUpperCase();
        let secondCap = splitCondition[2].charAt(0).toUpperCase();
        tournament =
          firstCap +
          splitCondition[1].slice(1) +
          " " +
          secondCap +
          splitCondition[2].slice(1);
      } else {
        let cap = splitCondition[1].charAt(0).toUpperCase();
        tournament = cap + splitCondition[1].slice(1);
      }

      // Start Days, times and match namse
      const startDaysTimesAndMatchNames =
        await startDaysTimesAndMatchNamesScraper(driver, By, "dgAItem");

      // Odds
      const odds = await oddsScraper(driver, By, "div.oddsQ > a");

      // Inserting the start time and the start day
      for (let i = 0; i < startDaysTimesAndMatchNames.days.length; i++) {
        const matchInfo = {
          sport_type: sportType,
          nation: nation,
          tournament: tournament,
          start_day: startDaysTimesAndMatchNames.days,
          start_time: startDaysTimesAndMatchNames.times,
          home: startDaysTimesAndMatchNames.homes[i],
          away: startDaysTimesAndMatchNames.aways[i],
          one: odds.oneOdds[i],
          x: odds.xOdds[i],
          two: odds.twoOdds,
          one_x: odds.oneXOdds[i],
          one_two: odds.oneTwoOdds[i],
          x_two: odds.xTwoOdds[i],
          under1_5: odds.under1_5Odds[i],
          over1_5: odds.over1_5Odds[i],
          under2_5: odds.under2_5Odds[i],
          over2_5: odds.over2_5Odds[i],
          goal: odds.goalOdds[i],
          no_goal: odds.noGoalOdds[i],
        };
        planetwin365Odds.push(matchInfo);
      }
    } catch (error) {}
  }
  let planetwin365OddsFile = JSON.stringify(planetwin365Odds);
  return planetwin365OddsFile;
};

module.exports = planetwin365Scraper;
