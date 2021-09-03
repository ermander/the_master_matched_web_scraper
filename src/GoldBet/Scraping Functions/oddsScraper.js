const oddsScraper = async (html, By, selector) => {
  try {
    let oneOdds = [];
    let xOdds = [];
    let twoOdds = [];
    let oneXOdds = [];
    let oneTwoOdds = [];
    let xTwoOdds = [];
    let under2_5Odds = [];
    let over2_5Odds = [];
    let goalOdds = [];
    let noGoalOdds = [];

    let allOdds = await html.findElements(By.className(selector));
    for (let i = 0; i < allOdds.length; i++) {
      allOdds[i] = await allOdds[i].getText();
      if (i % 12 === 0) oneOdds.push(allOdds[i]);
      if (i % 12 === 1) xOdds.push(allOdds[i]);
      if (i % 12 === 2) twoOdds.push(allOdds[i]);
      if (i % 12 === 3) oneXOdds.push(allOdds[i]);
      if (i % 12 === 4) oneTwoOdds.push(allOdds[i]);
      if (i % 12 === 5) xTwoOdds.push(allOdds[i]);
      if (i % 12 === 6) under2_5Odds.push(allOdds[i]);
      if (i % 12 === 7) over2_5Odds.push(allOdds[i]);
      if (i % 12 === 8) goalOdds.push(allOdds[i]);
      if (i % 12 === 9) noGoalOdds.push(allOdds[i]);
    }
    return {
      oneOdds,
      xOdds,
      twoOdds,
      oneXOdds,
      oneTwoOdds,
      xTwoOdds,
      under2_5Odds,
      over2_5Odds,
      goalOdds,
      noGoalOdds,
    };
  } catch (error) {
    console.log("Nothing found by oddsScraper function");
  }
};

module.exports = oddsScraper;
