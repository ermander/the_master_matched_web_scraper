// Eurobet soccer links
const links = require("./eurobetLinks");

const eurobetScraper = async (Builder, By, Capabilities, sleep) => {
  // Chrome options
  const chrome = require("selenium-webdriver/chrome");
  const options = new chrome.Options();
  options.windowSize({ width: 800, height: 680 });
  const caps = new Capabilities();
  caps.setPageLoadStrategy("eager");
  // Initiating selenium web driver
  let driver = await new Builder()
    .withCapabilities(caps)
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  // Setting the page size
  await driver.manage().window();

  // Creating the objects with the match infoes
  let eurobetOdds = [];

  // Clicking the coockies button
  try {
    await driver.get("https://www.eurobet.it/it");
    await sleep(1000);

    const buttonsContainer = await driver.findElement(
      By.id("onetrust-button-group")
    );
    const buttons = await buttonsContainer.findElements(By.css("button"));

    await buttons[1].click();
    await sleep(1000);
  } catch (error) {
    if (error) {
      driver.close();
      return { error: "Element not interactable" };
    }
  }

  // Looping throw all the links in order to open all of them
  for (let i = 0; i < links.length; i++) {
    // Opening a new windows tab
    await driver.switchTo().newWindow("tab");
    // Navigate to Url
    await driver.get(links[i]);

    // Getting the sport type and the nation
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

      try {
        // Start day
        let start_day = await driver.findElements(
          By.css("div.time-box > div > p:nth-child(1)")
        );
        for (let i = 0; i < start_day.length; i++) {
          start_day[i] = await start_day[i].getText();
        }

        // Start time
        let start_time = await driver.findElements(
          By.css("div.time-box > div > p:nth-child(2)")
        );
        for (let i = 0; i < start_time.length; i++) {
          start_time[i] = await start_time[i].getText();
        }

        let home = await driver.findElements(
          By.css("div.event-players > span > div > a > span:nth-child(1)")
        );
        for (let i = 0; i < home.length; i++) {
          home[i] = await home[i].getText();
        }
        let away = await driver.findElements(
          By.css("div.event-players > span > div > a > span:nth-child(3)")
        );
        for (let i = 0; i < away.length; i++) {
          away[i] = await away[i].getText();
        }

        // One x two odds
        let oneOdds = [];
        let xOdds = [];
        let twoOdds = [];
        let odds = await driver.findElements(By.css(".quota-new > div > a"));
        for (let i = 0; i < odds.length; i++) {
          odds[i] = await odds[i].getText();
          if (i % 3 === 0) {
            oneOdds.push(odds[i]);
          }
          if (i % 3 === 1) {
            xOdds.push(odds[i]);
          }
          if (i % 3 === 2) {
            twoOdds.push(odds[i]);
          }
        }

        // Switching to under over odds
        let buttons = await driver.findElements(
          By.className("custom-arrow dx   slick-arrow slick-next")
        );
        for (let i = 0; i < buttons.length; i++) {
          await buttons[i].click();
        }
        await sleep(300);

        // Under over odds
        let underOverOdds = await driver.findElements(
          By.css(".quota-new > div > a")
        );
        for (let i = 0; i < underOverOdds.length; i++) {
          underOverOdds[i] = await underOverOdds[i].getText();
          if (underOverOdds[i].length < 1) {
            underOverOdds.splice(i, 1);
            i--;
          }
        }

        let underOdds = [];
        let overOdds = [];

        for (let i = 0; i < underOverOdds.length; i++) {
          if (i % 2 === 0) {
            underOdds.push(underOverOdds[i]);
          } else {
            overOdds.push(underOverOdds[i]);
          }
        }

        // Switching to goal nogoal odds
        for (let i = 0; i < buttons.length; i++) {
          await buttons[i].click();
        }
        await sleep(300);
        let goalNoGoalOdds = await driver.findElements(
          By.css(".quota-new > div > a")
        );

        for (let i = 0; i < goalNoGoalOdds.length; i++) {
          goalNoGoalOdds[i] = await goalNoGoalOdds[i].getText();
          if (goalNoGoalOdds[i].length < 1) {
            goalNoGoalOdds.splice(i, 1);
            i--;
          }
        }

        let goalOdds = [];
        let noGoalOdds = [];

        for (let i = 0; i < goalNoGoalOdds.length; i++) {
          if (i % 2 === 0) {
            goalOdds.push(goalNoGoalOdds[i]);
          } else {
            noGoalOdds.push(goalNoGoalOdds[i]);
          }
        }

        // DC odds
        // const scrollUp = await driver.findElement(
        //   By.className("Euicoico_arrows-backtop-full animate-show")
        // );
        // await scrollUp.click();
        // await sleep(300);

        let dcButtons = await driver.findElements(
          By.css("li.sportfilter-item > a")
        );
        let dcButtonsName = [];
        for (let i = 0; i < dcButtons.length; i++) {
          dcButtonsName.push(await dcButtons[i].getText());
          console.log(await dcButtons[i].getText());
        }
        let dcButtonIndex = dcButtonsName.indexOf("DC");
        console.log(dcButtonIndex);
        await dcButtons[dcButtonIndex].click();

        await sleep(300);
        let oneTwoOdds = await driver.findElements(
          By.css("div.quota-new > div > a")
        );
        for (let i = 0; i < oneTwoOdds.length; i++) {
          oneTwoOdds[i] = await oneTwoOdds[i].getText();
          if (oneTwoOdds[i].length < 1) {
            oneTwoOdds.splice(i, 1);
            i--;
          }
        }

        let prevButtons = await driver.findElements(
          By.className("custom-arrow sx   slick-arrow slick-prev")
        );

        for (let i = 0; i < prevButtons.length; i++) {
          await prevButtons[i].click();
        }
        await sleep(300);

        let xTwoOdds = await driver.findElements(
          By.css("div.quota-new > div > a")
        );

        for (let i = 0; i < xTwoOdds.length; i++) {
          xTwoOdds[i] = await xTwoOdds[i].getText();
          if (xTwoOdds[i].length < 1) {
            xTwoOdds.splice(i, 1);
            i--;
          }
        }

        for (let i = 0; i < prevButtons.length; i++) {
          await prevButtons[i].click();
        }
        await sleep(300);

        let oneXOdds = await driver.findElements(
          By.css("div.quota-new > div > a")
        );

        for (let i = 0; i < oneXOdds.length; i++) {
          oneXOdds[i] = await oneXOdds[i].getText();
          if (oneXOdds[i].length < 1) {
            oneXOdds.splice(i, 1);
            i--;
          }
        }

        // Creating the infoes object
        for (let i = 0; i < start_day.length; i++) {
          let match_info = {
            sport_type,
            start_time: start_time[i],
            start_day: start_day[i],
            home: home[i],
            away: away[i],
            nation,
            tournament,
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
          eurobetOdds.push(match_info);
          //console.log(match_info);
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {}
  }

  return eurobetOdds;
};

module.exports = eurobetScraper;
