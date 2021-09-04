const oddsScraper = async (driver, By, selector) => {
  try {
    let oneOdds = [];
    let xOdds = [];
    let twoOdds = [];
    let under2_5Odds = [];
    let over2_5Odds = [];
    let goalOdds = [];
    let noGoalOdds = [];

    const infoes = await driver.findElements(By.className(selector));
    for (let i = 0; i < infoes.length; i++) {
      let container = await infoes[i].getAttribute("innerText");
      if (i % 7 === 0) oneOdds.push(container);
      if (i % 7 === 1) xOdds.push(container);
      if (i % 7 === 2) twoOdds.push(container);
      if (i % 7 === 3) under2_5Odds.push(container);
      if (i % 7 === 4) over2_5Odds.push(container);
      if (i % 7 === 5) goalOdds.push(container);
      if (i % 7 === 6) noGoalOdds.push(container);
    }
    return {
      oneOdds,
      xOdds,
      twoOdds,
      under2_5Odds,
      over2_5Odds,
      goalOdds,
      noGoalOdds,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = oddsScraper;
