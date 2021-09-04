const matchNamesScraper = async (driver, By, selector) => {
  try {
    let homes = [];
    let aways = [];
    const matchNames = await driver.findElements(By.className(selector));
    for (let i = 0; i < matchNames.length; i++) {
      if (i % 2 === 0) homes.push(await matchNames[i].getText());
      if (i % 2 === 1) aways.push(await matchNames[i].getText());
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = matchNamesScraper;
