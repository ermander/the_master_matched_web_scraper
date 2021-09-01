const homeAndAwayScraper = async (driver, By, selector) => {
  try {
    let homeAndAway = await driver.findElements(By.className(selector));
    let home = [];
    let away = [];
    for (let i = 0; i < homeAndAway.length; i++) {
      homeAndAway[i] = await homeAndAway[i].getText();
      if (i % 2 === 0) home.push(homeAndAway[i]);
      if (i % 2 === 1) away.push(homeAndAway[i]);
    }
    return {
      home, away
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = homeAndAwayScraper;
