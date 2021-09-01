const homeAwayScraper = async (driver, By, selector) => {
  try {
    let homeAway = await driver.findElements(By.id(selector));
    let home = [];
    let away = [];
    for (let i = 0; i < homeAway.length; i++) {
      homeAway[i] = await homeAway[i].getText();
      home.push(homeAway[i].split("-")[0].trim());
      away.push(homeAway[i].split("-")[1].trim());
    }
    return { home, away };
  } catch (error) {
    console.log(error);
  }
};

module.exports = homeAwayScraper;
