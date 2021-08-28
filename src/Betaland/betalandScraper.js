const fs = require("fs");

const betalandScraper = async (
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
  let betalandOdds = [];

  // Looping throw all the links in order to open all of them
  for (let i = 0; i < links.length; i++) {
    // Opening a new windows tab
    await driver.switchTo().newWindow("tab");
    // Navigate to Url
    await driver.get(links[i]);
  }

  // Getting the id of all the tabs opened
  const allWindows = await driver.getAllWindowHandles();
  for (let i = 0; i < allWindows.length; i++) {
    await driver.switchTo().window(allWindows[i]);
    await sleep(200);
    console.log("Scraping:    ", await driver.getCurrentUrl());

    try {
      // Home and Away
      let home = await driver.findElements(
        By.className("font-weight-bold m-0 text-right")
      );
      for (let i = 0; i < home.length; i++) {
        home[i] = await home[i].getText();
      }
      let away = await driver.findElements(
        By.className("font-weight-bold m-0 text-left")
      );
      for (let i = 0; i < away.length; i++) {
        away[i] = await away[i].getText();
      }

      // All Odds (1X2, 1X 12 X2, U/O2.5, GG/NG)
      let allOdds = await driver.findElements(By.className("tipoQuotazione_1"));
      for (let i = 0; i < allOdds.length; i++) {
        allOdds[i] = await allOdds[i].getText();
      }
      console.log(allOdds);
      allOdds.unshift("none");
      let oneOdds = [];
      let xOdds = [];
      let twoOdds = [];
      let oneXOdds = [];
      let oneTwoOdds = [];
      let xTwoOdds = [];
      let underOdds = [];
      let overOdds = [];
      let goalOdds = [];
      let noGoalOdds = [];

      for (let i = 0; i < allOdds.length; i++) {
        if (i % 10 === 1) {
          oneOdds.push(allOdds[i]);
        }
        if (i % 10 === 2) {
          xOdds.push(allOdds[i]);
        }
        if (i % 10 === 3) {
          twoOdds.push(allOdds[i]);
        }
        if (i % 10 === 4) {
          oneXOdds.push(allOdds[i]);
        }
        if (i % 10 === 5) {
          oneTwoOdds.push(allOdds[i]);
        }
        if (i % 10 === 6) {
          xTwoOdds.push(allOdds[i]);
        }
        if (i % 10 === 7) {
          underOdds.push(allOdds[i]);
        }
        if (i % 10 === 8) {
          overOdds.push(allOdds[i]);
        }
        if (i % 10 === 9) {
          goalOdds.push(allOdds[i]);
        }
        if (i % 10 === 0) {
          noGoalOdds.push(allOdds[i]);
        }
      }
      noGoalOdds.shift();

      // Sport, Nation and tournament
      // !!!!!!!!!!!!!!!!!!!!!!!!! AGGIUNGERE !!!!!!!!!!!!!!!!!

      let boxesDividedForDay = await driver.findElements(
        By.css("div#tabella-c")
      );
      const numberOfDays = boxesDividedForDay.length;

      let numberOfMatchPerDayArray = [];

      for (let i = 0; i < boxesDividedForDay.length; i++) {
        numberOfMatchPerDay = await boxesDividedForDay[i].findElements(
          By.className("tabellaQuoteSquadre pointer")
        );
        numberOfMatchPerDayArray.push(numberOfMatchPerDay.length);
      }

      // Start Day
      let startDays = await driver.findElements(
        By.className("tabellaQuoteData pl-2")
      );
      for (let i = 0; i < startDays.length; i++) {
        startDays[i] = await startDays[i].getText();
      }

      // Start time
      let startTimes = await driver.findElements(
        By.className("tabellaQuoteTempo__ora")
      );
      for (let i = 0; i < startTimes.length; i++) {
        startTimes[i] = await startTimes[i].getText();
      }

      // Adding the start day
      for (let i = 0; i < boxesDividedForDay.length; i++) {
        for (let j = 0; j < numberOfMatchPerDayArray[i]; j++) {
          let match_info = {
            start_day: startDays[i],
            start_time: startTimes[i],
          };
          betalandOdds.push(match_info);
        }
      }

      betalandOdds = betalandOdds.map((odd, i) => {
        return {
          ...odd,
          sport_type: "Calcio",
          home: home[i],
          away: away[i],
          one: oneOdds[i],
          x: xOdds[i],
          two: twoOdds[i],
          one_x: oneXOdds[i],
          one_two: oneTwoOdds[i],
          x_two: xTwoOdds[i],
          under_2_5: underOdds[i],
          over_2_5: overOdds[i],
          goal: goalOdds[i],
          no_goal: noGoalOdds[i],
        };
      });
    } catch (error) {
      console.log(error);
      return error;
    }

    driver.close();
  }
  let betalandOddsFile = JSON.stringify(betalandOdds);
  fs.writeFileSync("betalandOdds.json", betalandOddsFile);
  return betalandOdds;
};

module.exports = betalandScraper;
