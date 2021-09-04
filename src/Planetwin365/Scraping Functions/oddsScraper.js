const oddsScraper = async (driver, By, selector) => {
  try {
    let oneXTwoOdds = await driver.findElements(By.css(selector));
    for (let i = 0; i < oneXTwoOdds.length; i++) {
      oneXTwoOdds[i] = await oneXTwoOdds[i].getText();
      if (oneXTwoOdds[i] === "") {
        oneXTwoOdds[i] = "1";
      }
    }
    let oneOdds = [];
    let xOdds = [];
    let twoOdds = [];
    let oneXOdds = [];
    let oneTwoOdds = [];
    let xTwoOdds = [];
    let under1_5Odds = [];
    let over1_5Odds = [];
    let under2_5Odds = [];
    let over2_5Odds = [];
    let goalOdds = [];
    let noGoalOdds = [];

    for (let i = 0; i < oneXTwoOdds.length; i++) {
      if (i % 12 === 0) {
        oneOdds.push(oneXTwoOdds[i]);
      }
      if (i % 12 === 1) {
        xOdds.push(oneXTwoOdds[i]);
      }
      if (i % 12 === 2) {
        twoOdds.push(oneXTwoOdds[i]);
      }
      if (i % 12 === 3) {
        oneXOdds.push(oneXTwoOdds[i]);
      }
      if (i % 12 === 4) {
        oneTwoOdds.push(oneXTwoOdds[i]);
      }
      if (i % 12 === 5) {
        xTwoOdds.push(oneXTwoOdds[i]);
      }
      if (i % 12 === 6) {
        under1_5Odds.push(oneXTwoOdds[i]);
      }
      if (i % 12 === 7) {
        over1_5Odds.push(oneXTwoOdds[i]);
      }
      if (i % 12 === 8) {
        under2_5Odds.push(oneXTwoOdds[i]);
      }
      if (i % 12 === 9) {
        over2_5Odds.push(oneXTwoOdds[i]);
      }
      if (i % 12 === 10) {
        goalOdds.push(oneXTwoOdds[i]);
      }
      if (i % 12 === 11) {
        noGoalOdds.push(oneXTwoOdds[i]);
      }
    }
    return {
      oneOdds,
      xOdds,
      twoOdds,
      oneXOdds,
      oneTwoOdds,
      xTwoOdds,
      under1_5Odds,
      over1_5Odds,
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
