// Eurobet soccer links
const links = require("./eurobetLinks");

const eurobetScraper = async (driver, By) => {
  // Creating the objects with the match infoes
  let eurobetOdds = [];

  // Clicking the coockies button
  try {
    await driver.get("https://www.eurobet.it/it");
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    await sleep(300);

    const buttonsContainer = await driver.findElement(
      By.id("onetrust-button-group")
    );
    const buttons = await buttonsContainer.findElements(By.css("button"));

    await buttons[1].click();
    await sleep(300);
  } catch (error) {
    if (error) return error;
  }

  // Looping throw all the links in order to open all of them
  for (let i = 0; i < links.length; i++) {
    // Opening a new windows tab
    await driver.switchTo().newWindow("tab");
    // Navigate to Url
    await driver.get(links[i]);
  }

  // Getting the id of all the tabs opened
  const allWindows = await driver.getAllWindowHandles();

  let windowsCounter = 1;
  let whileState = true;
  while (whileState) {
    await driver.switchTo().window(allWindows[windowsCounter]);
    // Creating sport, nation and tournament infoes
    const sport_type = "Calcio";
    let nation;
    let tournament;

    try {
      const nationWebElements = await driver.findElement(
        By.className("breadcrumbs")
      );
      const h2Tags = await nationWebElements.findElements(
        By.className("title-event")
      );
      nation = await h2Tags[1].getText();
      tournament = await h2Tags[3].getText();
      windowsCounter += 1;

      if (windowsCounter === allWindows.length) {
        whileState = false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  try {
    // Start day
    let start_day = await driver.findElements(
      By.css("div.time-box > div > p:nth-child(1)")
    );

    // Start time
    let start_time = await driver.findElements(
      By.css("div.time-box > div > p:nth-child(2)")
    );

    // One x two odds
    let odds = await driver.findElements(By.css(".quota-new > div > a"));

    // Switching to under over odds
    let buttons = await driver.findElements(
      By.className("custom-arrow dx   slick-arrow slick-next")
    );
    for (let i = 0; i < buttons.length; i++) {
      await buttons[i].click();
    }

    // Under over odds
    let underOverOdds = await driver.findElements(By.css(".quota-new"));
    console.log(underOverOdds.length);

    let underOdds = [];
    let overOdds = [];
    let arrayStatus = "Not Even";
    for (let i = 0; i < underOverOdds.length; i++) {
      if (arrayStatus === "Not Even") {
        underOdds.push(underOverOdds[i]);
        arrayStatus = "Even";
      }
      if (arrayStatus === "Even") {
        overOdds.push(underOverOdds[i]);
        arrayStatus = "Not Even";
      }
    }
    console.log(underOdds.length, overOdds.length);

    // Switching to goal nogoal odds
    for (let i = 0; i < buttons.length; i++) {
      await buttons[i].click();
    }
    let goalNoGoalOdds = await driver.findElements(
      By.css(".quota-new > div > a")
    );

    // Creating the infoes object
    for (let i = 0; i < start_day.length; i++) {
      let match_info = {
        sport_type,
        start_time: start_time[i].getText(),
        start_day: start_day[i].getText(),
        //match_name:
        nation,
        tournament,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = eurobetScraper;
