const nationTournamentScraper = async (driver, By, selector) => {
  try {
    let days = [];
    let times = [];
    const date = new Date();
    let year = date.getFullYear().toString();
    let rows = await driver.findElements(By.className(selector));
    let homes = [];
    let aways = [];

    for (let i = 0; i < rows.length; i++) {
      // Days and times
      let dayContainer = await rows[i]
        .findElement(
          By.className("dateTimeBox_regulatorTime__2dN09 bg-black-blue")
        )
        .getText();
      days.push(dayContainer.split("\n")[0] + "/" + year);
      times.push(dayContainer.split("\n")[1]);

      // Match names
      let matchNamesContainer = await rows[i].findElement(
        By.className("regulator_wrapperContentLink__1wp1l")
      );
      let matchSpans = await matchNamesContainer.findElements(
        By.className("d-block text-capitalize")
      );
      homes.push(await matchSpans[0].getText());
      aways.push(await matchSpans[1].getText());
    }
    return { days, times, homes, aways };
  } catch (error) {
    console.log(error);
  }
};

module.exports = nationTournamentScraper;
