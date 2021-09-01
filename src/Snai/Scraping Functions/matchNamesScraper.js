const matchNamesScraper = async (driver, By, selector) => {
  try {
    let homes = [];
    let aways = [];
    let matchNames = await driver.findElements(By.css(selector));

    for (let i = 0; i < matchNames.length; i++) {
      matchNames[i] = await matchNames[i].getText();
      homes.push(matchNames[i].split(" - ")[0]);
      aways.push(matchNames[i].split(" - ")[1]);
    }

    return { homes, aways };
  } catch (error) {
    console.log(error);
  }
};

module.exports = matchNamesScraper;
