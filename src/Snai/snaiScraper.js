const fs = require("fs");

// Scraping funcionts
const timesScraper = require("./Scraping Functions/timesScraper");
const matchNamesScraper = require("./Scraping Functions/matchNamesScraper");
const oddsScraper = require("./Scraping Functions/oddsScraper");
const dcButtonScraper = require("./Scraping Functions/dcButtonScraper");
const dcOddsScraper = require("./Scraping Functions/dcOddsScraper");
const daysScraper = require("./Scraping Functions/daysScraper");

const snaiScraper = async (chrome, Builder, By, Capabilities, links, sleep) => {
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
  let snaiOdds = [];
  await driver.get(links[0]);
  const coockiesButton = await driver.findElements(
    By.className("btn-primary accept-btn")
  );
  await coockiesButton[0].click();

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
      // Times
      const startTimes = await timesScraper(
        driver,
        By,
        "hourMatchFootball ng-binding"
      );

      let startDays = await daysScraper(
        driver,
        By,
        "div.margin-bottom-3.ng-scope > h4 > a"
      );

      // Match Names
      const matchNames = await matchNamesScraper(
        driver,
        By,
        "span.descriptionTextBlue > a.ng-binding"
      );

      // Odds
      let odds = await oddsScraper(
        driver,
        By,
        "footballBlueBetting ng-binding"
      );

      // Clicking the double chance button
      await dcButtonScraper(
        driver,
        By,
        "2 btn btn-default col-xs-4 btn-xs ellipsis ng-binding ng-scope"
      );

      // Double Chance
      let whileStatus = true;
      let dcOdds = [];
      while (whileStatus) {
        let dcOddsResult = await dcOddsScraper(
          driver,
          By,
          "ng-binding ng-scope"
        );
        console.log("Ricomincio");
        if (dcOddsResult.error === false) {
          whileStatus = false;
          dcOdds = dcOddsResult;
        }
      }

      // Number of match days
      const boxesDividedForDay = await driver.findElements(
        By.className("margin-bottom-3 ng-scope")
      );
      console.log(boxesDividedForDay.length);
      let numberOfMatchPerDayArray = [];
      let temporaryOdds = [];

      for (let i = 0; i < boxesDividedForDay.length; i++) {
        numberOfMatchPerDay = await boxesDividedForDay[i].findElements(
          By.css("a.ng-binding")
        );
        numberOfMatchPerDayArray.push(parseInt(numberOfMatchPerDay.length) - 1);
      }
      console.log(numberOfMatchPerDayArray);

      // Adding the start day
      for (let i = 0; i < boxesDividedForDay.length; i++) {
        console.log("Salvo i giorni");
        for (let j = 0; j < numberOfMatchPerDayArray[i]; j++) {
          console.log("Salvo i giorni");
          let match_info = {
            start_day: startDays[i],
          };
          temporaryOdds.push(match_info);
          console.log(match_info);
        }
      }
      temporaryOdds = temporaryOdds.map((odd, i) => {
        console.log("Salvo tutte le info");
        return {
          ...odd,
          sport_type: "Calcio",
          //nation: sportNationTournament.nation,
          //tournament: sportNationTournament.tournament,
          home: matchNames.homes[i],
          away: matchNames.aways[i],
          start_time: startTimes[i],
          one: odds.one[i],
          x: odds.x[i],
          two: odds.two[i],
          one: odds.one[i],
          one_x: dcOdds.oneXOdds[i],
          one_two: dcOdds.oneTwoOdds[i],
          x_two: dcOdds.xTwoOdds[i],
          under_2_5: odds.under[i],
          over_2_5: odds.over[i],
          goal: odds.goal[i],
          no_goal: odds.noGoal[i],
        };
      });
      snaiOdds = [...snaiOdds, ...temporaryOdds];
    } catch (error) {
      console.log(error);
      return error;
    }
    driver.close();
  }
  let snaiOddsFile = JSON.stringify(snaiOdds);
  fs.writeFileSync("snaiOdds.json", snaiOddsFile);
  driver.quit();
  return snaiOdds;
};

module.exports = snaiScraper;
