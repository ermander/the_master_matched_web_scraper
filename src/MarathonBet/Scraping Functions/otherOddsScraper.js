const nationNames = require("../Nation Names/nationNames");

const otherOddsScraper = async (driver, By, matchNames, nation, tournament) => {
  try {
    for (let i = 0; i < matchNames.homes.length; i++) {
      let link;
      const baseLinks =
        "https://www.marathonbet.it/it/betting/Football/" +
        nationNames[nation] +
        "/";

      let tournamentLink;
      if (tournament.split(" ").length >= 1) {
        tournamentLink =
          tournament.split(" ")[0] + "+" + tournament.split(" ")[1] + "/";
      } else {
        tournamentLink = tournament;
      }

      let matchNamesLink =
        matchNames.homes[i] + "+" + "vs" + "+" + matchNames.aways[i];

      link = baseLinks + tournamentLink + matchNamesLink;
      link = link.toString();
      await driver.get(link);

      // Market Buttons
      let allOddsButton = await driver.findElements(
        By.css("table.table-shortcuts-menu > tbody > tr > td:nth-child(1)")
      );
      await allOddsButton[1].click();

      // Odds Container
      let oddsContainer = await driver.findElements(
        By.className(" coeff-link-2way ")
      );
      let oddsName = await oddsContainer[1].findElements(
        By.className("coeff-value")
      );
      for (let i = 0; i < oddsName.length; i++) {
        console.log(await oddsName[i].getText());
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = otherOddsScraper;
