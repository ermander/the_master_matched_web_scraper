const tournaments = require("./Tournaments/tournaments");

// Scraping Functions
const matchNamesScraper = require("./Scraping Functions/matchNamesScraper");
const daysAndTimesScraper = require("./Scraping Functions/daysAndTimesScraper");
const oddsScraper = require("./Scraping Functions/oddsScraper");
const marketButtonsScraper = require("./Scraping Functions/marketButtonsScraper");
const underOver1_5OddsScraper = require("./Scraping Functions/underOver1_5OddsScraper");
const underOver3_5OddsScraper = require("./Scraping Functions/underOver3_5OddsScraper");
const goalNoGoalOddsScraper = require("./Scraping Functions/goalNoGoalOddsScraper");
const dcOddsScraper = require("./Scraping Functions/dcOddsScraper");

const betterScraper = async (
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
  let betterOdds = [];
  await driver.get(links[0]);
  const coockiesButton = await driver.findElement(
    By.className("btn btn-yellow cookie-bar--btn-accept pull-right ng-binding")
  );
  await coockiesButton.click();

  for (let i = 0; i < links.length; i++) {
    try {
      await driver.get(links[i]);
      await sleep(1000);
      console.log("Scraping:    ", await driver.getCurrentUrl());

      // Sport type
      let sportType = links[i].split("/")[5];
      let sportTypeCap = sportType.charAt(0).toUpperCase();
      sportType = sportTypeCap + links[i].split("/")[5].slice(1);

      // Nation
      let nation = links[i].split("/")[6];
      let nationCap = nation.charAt(0).toUpperCase();
      nation = nationCap + links[i].split("/")[6].slice(1);

      // Tournament
      let tournament = links[i].split("/")[7].split(".html")[0];
      tournament = tournaments[tournament];

      // Match Names
      const matchNames = await matchNamesScraper(
        driver,
        By,
        "event-name ng-binding"
      );

      // Match start
      const daysAndTimes = await daysAndTimesScraper(
        driver,
        By,
        "event-date ng-binding"
      );
      // Odds
      const odds = await oddsScraper(driver, By, "price-value ng-binding");

      // Market Buttons
      const marketButtons = await marketButtonsScraper(
        driver,
        By,
        "market-selection ng-scope"
      );

      let buttonIndex;
      buttonIndex = marketButtons.buttonsNames.indexOf("Under/Over 1.5");
      await marketButtons.buttons[buttonIndex].click();
      await sleep(1000);

      // U/O 1.5 odds
      const underOver1_5Odds = await underOver1_5OddsScraper(
        driver,
        By,
        "price-value ng-binding"
      );
      buttonIndex = marketButtons.buttonsNames.indexOf("Under/Over 3.5");
      await marketButtons.buttons[buttonIndex].click();
      await sleep(1000);
      // U/O 3.5 odds
      const underOver3_5Odds = await underOver3_5OddsScraper(
        driver,
        By,
        "price-value ng-binding"
      );

      // Goal NoGoal Odds
      buttonIndex = marketButtons.buttonsNames.indexOf("Goal/No Goal");
      await marketButtons.buttons[buttonIndex].click();
      await sleep(1000);
      const goalNoGoalOdds = await goalNoGoalOddsScraper(
        driver,
        By,
        "price-value ng-binding"
      );

      const nextButtons = await driver.findElement(By.className("bslick-next"));
      await nextButtons.click();
      await nextButtons.click();
      await sleep(1000);
      buttonIndex = marketButtons.buttonsNames.indexOf("Doppia Chance");
      await marketButtons.buttons[buttonIndex].click();
      await sleep(1000);

      // DC odds
      const dcOdds = await dcOddsScraper(driver, By, "selection-price");

      for (let i = 0; i < dcOdds.oneXOdds.length; i++) {
        let matchInfo = {
          sport_type: sportType,
          nation: nation,
          tournament: tournament,
          start_day: daysAndTimes.days[i],
          start_time: daysAndTimes.times[i],
          home: matchNames.homes[i],
          away: matchNames.aways[i],
          one: odds.oneOdds[i],
          x: odds.xOdds[i],
          two: odds.twoOdds[i],
          one_x: dcOdds.oneXOdds[i],
          one_two: dcOdds.oneTwoOdds[i],
          x_two: dcOdds.xTwoOdds[i],
          under1_5: underOver1_5Odds.under1_5Odds[i],
          over1_5: underOver1_5Odds.over1_5Odds[i],
          under2_5: odds.under2_5Odds[i],
          over2_5: odds.over2_5Odds[i],
          under3_5: underOver3_5Odds.under3_5Odds[i],
          over3_5: underOver3_5Odds.over3_5Odds[i],
          goal: goalNoGoalOdds.goalOdds[i],
          no_goal: goalNoGoalOdds.noGoalOdds[i],
        };
        betterOdds.push(matchInfo);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const betterOddsFile = JSON.stringify(betterOdds);
  return betterOddsFile;
};

module.exports = betterScraper;
