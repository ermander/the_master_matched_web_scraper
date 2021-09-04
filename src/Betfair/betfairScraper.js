// Scraping Function
const matchNamesScraper = require("./Scraping Functions/matchNamesScraper");
const oddsScraper = require("./Scraping Functions/oddsScraper");
const selectFormOptionsScraper = require("./Scraping Functions/selectFormOptionsScraper");
const goalNoGoalOddsScraper = require("./Scraping Functions/goalNoGoalOddsScraper");
const underOver0_5OddsScraper = require("./Scraping Functions/underOver0_5OddsScraper");
const underOver1_5OddsScraper = require("./Scraping Functions/underOver1_5OddsScraper");
const underOver3_5OddsScraper = require("./Scraping Functions/underOver3_5OddsScraper");
const underOver4_5OddsScraper = require("./Scraping Functions/underOver4_5OddsScraper");
const dcOddsScraper = require("./Scraping Functions/dcOddsScraper");
const matchStartScraper = require("./Scraping Functions/matchStartScraper");

const betfairScraper = async (
  chrome,
  Builder,
  By,
  Capabilities,
  links,
  sleep
) => {
  // Creating the chrome options
  const options = new chrome.Options();
  options.windowSize({ width: 1400, height: 750 });
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
  let betfairOdds = [];

  // PROVA

  try {
    await driver.get(links[0]);
    await sleep(2000);
    const coockiesButton = await driver.findElement(
      By.id("onetrust-accept-btn-handler")
    );
    await coockiesButton.click();
    await sleep(500);

    for (let i = 0; i < links.length; i++) {
      try {
        await driver.get(links[i]);
        await sleep(1000);
        console.log("Scraping:    ", await driver.getCurrentUrl());

        // Match start
        const matchStart = await matchStartScraper(
          driver,
          By,
          "date ui-countdown"
        );

        // Match names
        const matchNames = await matchNamesScraper(driver, By, "team-name");
        // Odds
        const odds = await oddsScraper(
          driver,
          By,
          "ui-runner-price  ui-display-decimal-price"
        );

        // Select form for other odds
        const selectFormLinks = await selectFormOptionsScraper(
          driver,
          By,
          "ui-expandable com-dropdown-header"
        );
        let goalNoGoalOdds = [];
        let underOver0_5Odds = [];
        let underOver1_5Odds = [];
        let underOver3_5Odds = [];
        let underOver4_5Odds = [];
        let dcOdds = [];

        for (let i = 0; i < selectFormLinks.length; i++) {
          if (i !== 3 || i !== 6) {
            if (i === 0) {
              await driver.get(selectFormLinks[i]);
              goalNoGoalOdds.push(
                await goalNoGoalOddsScraper(
                  driver,
                  By,
                  "details-market market-2-runners"
                )
              );
            }
            if (i === 1) {
              await driver.get(selectFormLinks[i]);
              underOver0_5Odds.push(
                await underOver0_5OddsScraper(
                  driver,
                  By,
                  "details-market market-2-runners"
                )
              );
            }
            if (i === 2) {
              await driver.get(selectFormLinks[i]);
              underOver1_5Odds.push(
                await underOver1_5OddsScraper(
                  driver,
                  By,
                  "details-market market-2-runners"
                )
              );
            }
            if (i === 4) {
              await driver.get(selectFormLinks[i]);
              underOver3_5Odds.push(
                await underOver3_5OddsScraper(
                  driver,
                  By,
                  "details-market market-2-runners"
                )
              );
            }
            if (i === 5) {
              await driver.get(selectFormLinks[i]);
              underOver4_5Odds.push(
                await underOver4_5OddsScraper(
                  driver,
                  By,
                  "details-market market-2-runners"
                )
              );
            }
            if (i === 7) {
              await driver.get(selectFormLinks[i]);
              dcOdds.push(
                await dcOddsScraper(
                  driver,
                  By,
                  "details-market market-3-runners"
                )
              );
            }
          }
        }

        for (let i = 0; i < matchNames.homes.length; i++) {
          let matchInfo = {};
          betfairOdds.push(matchInfo);
        }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = betfairScraper;
