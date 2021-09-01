const nationTournamentSportScraper = async (
  driver,
  By,
  selectorOne,
  selectorTwo,
  selectorThree
) => {
  try {
    let nation = await driver.findElements(By.css(selectorOne));
    nation = await nation[0].getText();
    nation = nation.split(".")[0];
    let tournament = await driver.findElements(By.css(selectorTwo));
    tournament = await tournament[0].getText();
    let sportType = await driver.findElements(By.className(selectorThree));
    sportType = await sportType[0].getText();
    return { nation, tournament, sportType };
  } catch (error) {
    console.log(error);
  }
};

module.exports = nationTournamentSportScraper;
