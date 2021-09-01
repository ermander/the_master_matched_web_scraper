const tournamentScraper = async (driver, By, selector) => {
  try {
    const tournament = await driver.findElements(By.css(selector));
    console.log(tournament);
  } catch (error) {
    console.log(error);
  }
};

module.exports = tournamentScraper;
