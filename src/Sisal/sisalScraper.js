// Scraping funcionts
const infoesScraper = require("./Scraping Functions/infoesScraper");
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

  await driver.get(links[0]);
  const coockiesButtonContainer = await driver.findElement(
    By.className("toast snackbar-cookie js-snackbar-cookie fade show")
  );
  const cookiesButton = await coockiesButtonContainer.findElement(
    By.className("close")
  );
  await cookiesButton.click();

  for (let i = 0; i < links.length; i++) {
    try {
      await driver.get(links[i]);
      await sleep(1000);
      console.log("Scraping:    ", await driver.getCurrentUrl());

      // Sport Type
      let sportType = links[i].split("/")[5];
      let sportTypeCap = sportType.charAt(0).toUpperCase();
      sportType = sportTypeCap + links[i].split("/")[5].slice(1);

      // Nation
      let nation = links[i].split("/")[6];
      let nationCap = nation.charAt(0).toUpperCase();
      nation = nationCap + links[i].split("/")[6].slice(1);

      // Tournament
      let tournament = links[i].split("/")[7];
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

      const infoes = await infoesScraper(
        driver,
        By,
        "grid_noPromoAlert__3VmLi"
      );

      const odds = await oddsScraper(
        driver,
        By,
        "selectionButton_selectionPrice__2cboZ"
      );

      let goalNoGoalButtonContainer = await driver.findElements(
        By.className(
          "fr-col-md-4 fr-col-xxxl-3 marketBar_columnMarketPadding__1KTop"
        )
      );
      let goalNoGoalButton = await goalNoGoalButtonContainer[1].findElements(
        By.css("button")
      );
      await goalNoGoalButton[0].click();
      await sleep(200);
      const goalNoGoal = await goalNoGoalScraper(
        driver,
        By,
        "selectionButton_selectionPrice__2cboZ"
      );

      for (let i = 0; i < infoes.homes.length; i++) {
        console.log("Entro");
        let match_info = {
          sport_type: sportType,
          nation: nation,
          tournament: tournament,
          start_day: infoes.days[i],
          start_time: infoes.times[i],
          home: infoes.homes[i],
          away: infoes.aways[i],
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
        sisalOdds.push(match_info);
      }
    } catch (error) {}
  }
  let sisalOddsFile = JSON.stringify(sisalOdds);
  return sisalOddsFile;
};

module.exports = sisalScraper;
