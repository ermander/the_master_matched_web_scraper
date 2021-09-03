const fs = require("fs"); // JSDOM library.
const { JSDOM } = require("jsdom");
const { window } = new JSDOM();

// Scraping Functions
const oddsScraper = require("./Scraping Functions/oddsScraper");
const daysTimesAndMatchNamesScraper = require("./Scraping Functions/daysTimesAndMatchNamesScraper");

const goldbetScraper = async (
  chrome,
  Builder,
  By,
  Capabilities,
  links,
  sleep
) => {
  // Creating the chrome options
  let options = new chrome.Options();
  options.windowSize({ width: 1500, height: 850 });
  options.headless();
  // Setting the strategies of the page load
  let caps = new Capabilities();
  caps.setPageLoadStrategy("none");

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

  // Looping throw all the links in order to open all of them
  for (let i = 0; i < links.length; i++) {
    // Opening a new windows tab
    await driver.switchTo().newWindow("tab");
    // Navigate to Url
    await driver.get(links[i]);
  }
  await sleep(4000)
  // Getting the id of all the tabs opened
  const allWindows = await driver.getAllWindowHandles();

  for (let i = 1; i < allWindows.length; i++) {
    await driver.switchTo().window(allWindows[i]);
    try {
      await driver.switchTo().window(allWindows[i]);
      await sleep(50);
      console.log("Scraping:    ", await driver.getCurrentUrl());

      // Sport type
      const link = await driver.getCurrentUrl();
      let sportType = link.split("/")[4];
      sportTypeCapitalized = sportType.charAt(0).toUpperCase();
      sportType = sportTypeCapitalized + link.split("/")[4].slice(1);

      // Nation
      let nation = link.split("/")[5];
      nationCapitalized = nation.charAt(0).toUpperCase();
      nation = nationCapitalized + link.split("/")[5].slice(1);

      // Tournament
      let tournament = link.split("/")[6];
      let splitCondition = tournament.split("-");
      if (splitCondition.length >= 2) {
        let firstPartCapitalized = splitCondition[0].charAt(0).toUpperCase();
        let secondPartCapitalized = splitCondition[1].charAt(0).toUpperCase();
        tournament =
          firstPartCapitalized +
          splitCondition[0].slice(1) +
          " " +
          secondPartCapitalized +
          splitCondition[1].slice(1);
      } else {
        let capitalize = tournament.charAt(0).toUpperCase();
        tournament = capitalize + tournament.slice(1);
      }

      // Days and times
      const daysAndTimes = await daysTimesAndMatchNamesScraper(
        driver,
        By,
        "tr[data-evndate]"
      );
      // Match names
      //const matchNames = await matchNamesScraper(driver, By, "eventClick");
      // Odds
      const odds = await oddsScraper(driver, By, "odd default ");

      for (let i = 0; i < daysAndTimes.days.length; i++) {
        const matchInfo = {
          sport_type: sportType,
          nation: nation,
          tournament: tournament,
          start_day: daysAndTimes.days[i],
          start_time: daysAndTimes.times[i],
          home: daysAndTimes.homes[i],
          away: daysAndTimes.aways[i],
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
      driver.close();
    } catch (error) {}
  }
  console.log(goldbetOdds.length);
  const goldbetOddsFile = JSON.stringify(goldbetOdds);
  return goldbetOddsFile;
};

module.exports = goldbetScraper;
