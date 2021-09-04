const oddsScraper = async (driver, By, selector) => {
  try {
    let oneOdds = [];
    let xOdds = [];
    let twoOdds = [];
    let oneXOdds = [];
    let xTwoOdds = [];
    let oneTwoOdds = [];
    let under2_5Odds = [];
    let over2_5Odds = [];

    let odds = await driver.findElements(By.className(selector));
    for (let i = 0; i < odds.length; i++) {
      if (i % 8 === 0) oneOdds.push(await odds[i].getText());
      if (i % 8 === 1) xOdds.push(await odds[i].getText());
      if (i % 8 === 2) twoOdds.push(await odds[i].getText());
      if (i % 8 === 3) oneXOdds.push(await odds[i].getText());
      if (i % 8 === 4) xTwoOdds.push(await odds[i].getText());
      if (i % 8 === 5) oneTwoOdds.push(await odds[i].getText());
      if (i % 8 === 6) under2_5Odds.push(await odds[i].getText());
      if (i % 8 === 7) over2_5Odds.push(await odds[i].getText());
    }
    return {
      oneOdds,
      xOdds,
      twoOdds,
      oneXOdds,
      xTwoOdds,
      oneTwoOdds,
      under2_5Odds,
      over2_5Odds,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = oddsScraper;
