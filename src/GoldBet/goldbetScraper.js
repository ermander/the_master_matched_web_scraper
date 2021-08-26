// Goldbet soccer links
const links = require("./goldbetLinks");

const goldbetScraper = async (driver, By) => {
  // Creating the objects with the match infoes
  let goldbetOdds = [];

  // Looping throw all the links in order to open all of them
  for (let i = 0; i < links.length; i++) {
    // Opening a new windows tab
    await driver.switchTo().newWindow("tab");
    // Navigate to Url
    await driver.get(links[i]);
  }

  const allWindows = await driver.getAllWindowHandles();
  console.log(allWindows);

  for (let i = 1; i < allWindows.length; i++) {
    await driver.switchTo().window(allWindows[i]);
    console.log(i);
    // Searcing for all the table rows
    try {
      let rows = [];
      let counter = 0;
      let checkRowExistence = true;

      while (checkRowExistence) {
        try {
          const row = await driver.findElement(
            By.className("oddsRow111-" + counter + " sprmr tr-hover")
          );
          rows.push(row);
          counter += 1;
        } catch (error) {
          console.log(error);
          checkRowExistence = false;
        }
      }

      // Creating nation and tournament infoes
      let sport_type;
      let nation;
      let tournament;
      try {
        const nationWebElement = await driver.findElement(
          By.className("widget-title sport-title")
        );
        const liTags = await nationWebElement.findElements(By.css("li"));
        sport_type = await liTags[0].getText();
        nation = await liTags[1].getText();
        tournament = await liTags[2].getText();
      } catch (error) {
        console.log(error);
      }

      for (let i = 0; i < rows.length; i++) {
        try {
          let start_time = await rows[i]
            .findElement(By.className("time"))
            .getText();
          let match_name = await rows[i].findElements(
            By.className("eventClick")
          );
          match_name = await match_name[1].getText();
          const odds = await rows[i].findElements(By.className("odd default "));
          let one = await odds[0].getText();
          let x = await odds[1].getText();
          let two = await odds[2].getText();
          let one_x = await odds[3].getText();
          let one_two = await odds[4].getText();
          let x_two = await odds[5].getText();
          let under_2_5 = await odds[6].getText();
          let over_2_5 = await odds[7].getText();
          let goal = await odds[8].getText();
          let no_goal = await odds[9].getText();
          let even = await odds[10].getText();
          let not_even = await odds[11].getText();
          const match_info = {
            sport_type,
            start_time,
            match_name,
            nation,
            tournament,
            one,
            x,
            two,
            one_x,
            one_two,
            x_two,
            under_2_5,
            over_2_5,
            goal,
            no_goal,
            even,
            not_even,
          };
          goldbetOdds.push(match_info);
        } catch (error) {
          console.log(error);
        }
      }
      console.log(goldbetOdds.length);
      console.log(rows.length);
      driver.close()
    } finally {
      //driver.quit();
    }
  }

  return goldbetOdds;
};

module.exports = goldbetScraper;
