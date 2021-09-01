const nationTournamentScraper = async (driver, By, selector) => {
  try {
    let nationTournament = await driver.findElements(By.css(selector));
    nationTournament = await nationTournament[0].getText();
    const nation = nationTournament.split(" ")[0].trim();
    const tournament = nationTournament.split(" ")[1].trim();
    return {
      nation,
      tournament,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = nationTournamentScraper;
