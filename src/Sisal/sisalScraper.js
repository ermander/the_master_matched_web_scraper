const fs = require("fs");

// Scraping funcionts
const nationTournamentScraper = require("./Scraping Functions/nationTournamentScraper");
const startDaysAndTimesScaper = require("./Scraping Functions/startDaysAndTimesScaper");
const homeAndAwayScraper = require("./Scraping Functions/homeAndAwayScraper");
const oddsScraper = require("./Scraping Functions/oddsScraper");
const goalNoGoalScraper = require("./Scraping Functions/goalNoGoalScraper");
const sisalScraper = async (
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
  let sisalOdds = [];

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
      const nationTournament = await nationTournamentScraper(
        driver,
        By,
        "div.competitionHeader_labelCompetitionHeader__-fpJZ > p"
      );
      const startDayAndTimes = await startDaysAndTimesScaper(
        driver,
        By,
        "dateTimeBox_regulatorTime__2dN09 bg-black-blue"
      );
      const homeAndAway = await homeAndAwayScraper(
        driver,
        By,
        "d-block text-capitalize"
      );
      const odds = await oddsScraper(
        driver,
        By,
        "selectionButton_selectionPrice__2cboZ"
      );

      // Clicking the button for goal and no goal odds
      const goalNoGoalButton = await driver.findElements(
        By.className(
          "button_resetPadding__3sfpv button_fluid__X1hQB btn btn-light-grey"
        )
      );
      console.log(goalNoGoalButton.length);
      await goalNoGoalButton[1].click();
      await sleep(200);
      const goalNoGoal = await goalNoGoalScraper(
        driver,
        By,
        "selectionButton_selectionPrice__2cboZ"
      );

      for (let i = 0; i < goalNoGoal.goalOdds.length; i++) {
        let match_info = {
          sport_type: "Calcio",
          nation: nationTournament.nation,
          tournament: nationTournament.tournament,
          start_day: startDayAndTimes.startDays[i],
          start_time: startDayAndTimes.startTimes[i],
          home: homeAndAway.home[i],
          away: homeAndAway.away[i],
          one: odds.oneOdds[i],
          x: odds.xOdds[i],
          two: odds.twoOdds[i],
          one_x: odds.oneXOdds[i],
          one_two: odds.oneTwoOdds[i],
          x_two: odds.xTwoOdds[i],
          under2_5: odds.under2_5Odds[i],
          over2_5: odds.over2_5Odds[i],
          goal: goalNoGoal.goalOdds[i],
          no_goal: goalNoGoal.noGoalOdds[i],
        };
        console.log(match_info);
        sisalOdds.push(match_info);
      }
    } catch (error) {
      console.log(error);
    }
    driver.close();
  }
  let sisalOddsFile = JSON.stringify(sisalOdds);
  fs.writeFileSync("sisal.json", sisalOddsFile);
  driver.quit();
  return sisalOddsFile;
};

module.exports = sisalScraper;
