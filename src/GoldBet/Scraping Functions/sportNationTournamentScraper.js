const sportNationTournamentScraper = async (
  driver,
  By,
  selectorOne,
  selectorTwo
) => {
  try {
    const infoContainer = await driver.findElement(By.className(selectorOne));
    let infoes = await infoContainer.findElements(By.css(selectorTwo));
    for (let i = 0; i < infoes.length; i++) {
      infoes[i] = await infoes[i].getText();
    }
    let sportType = infoes[0];
    let nation = infoes[1];
    let tournament = infoes[2];
    return { sportType, nation, tournament };
  } catch (error) {
    console.log("Nothing found by sportNationTournamentScraper function");
  }
};

module.exports = sportNationTournamentScraper;
