const dcOddsScraper = async (driver, By, selector) => {
  try {
    let dcOdds = await driver.findElements(By.className(selector));
    let oneXOdds = [];
    let oneTwoOdds = [];
    let xTwoOdds = [];
    for (let i = 0; i < dcOdds.length; i++) {
      dcOdds[i] = await dcOdds[i].getText();
      if (dcOdds[i].length !== 4 || dcOdds[i] === "RACE") {
        dcOdds.splice(i, 1);
        i--;
      }
    }
    for (let i = 0; i < dcOdds.length; i++) {
      if (i % 3 === 0) oneXOdds.push(dcOdds[i]);
      if (i % 3 === 1) oneTwoOdds.push(dcOdds[i]);
      if (i % 3 === 2) xTwoOdds.push(dcOdds[i]);
    }
    return {
      oneXOdds,
      oneTwoOdds,
      xTwoOdds,
      error: false,
    };
  } catch (error) {
    return { error: true };
  }
};

module.exports = dcOddsScraper;
