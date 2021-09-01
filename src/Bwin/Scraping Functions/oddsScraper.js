const oddsScraper = async (driver, By, selector) => {
  try {
    const odds = await driver.findElements(By.css(selector));
    for (let i = 0; i < odds.length; i++) {
      odds[i] = await odds[i].getText();
      if (odds[i] === "") {
        odds.splice(i, 1);
        i--;
      }
    }
    for (let i = 0; i < odds.length; i++) {
      if (i % 6 === 3) {
        odds.splice(i, 1);
      }
    }
    console.log(odds);
  } catch (error) {
    console.log(error);
  }
};

module.exports = oddsScraper;
