const matchNamesScraper = async (driver, By, selector) => {
  try {
    let matchNames = await driver.findElements(By.css(selector));
    let homes = [];
    let aways = [];
    for (let i = 0; i < matchNames.length; i++) {
      matchNames[i] = await matchNames[i].getText();
      if (i % 2 === 0) homes.push(matchNames[i]);
      if (i % 2 === 1) aways.push(matchNames[i]);
    }
    return { homes, aways };
  } catch (error) {
    console.log(error);
  }
};

module.exports = matchNamesScraper;
