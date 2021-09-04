const goalNoGoalScraper = async (driver, By, selector) => {
  try {
    let goalNoGoal = await driver.findElements(By.className(selector));
    let goalOdds = [];
    let noGoalOdds = [];

    for (let i = 0; i < goalNoGoal.length; i++) {
      goalNoGoal[i] = await goalNoGoal[i].getText();
      if (i % 7 === 0) goalOdds.push(goalNoGoal[i]);
      if (i % 7 === 1) noGoalOdds.push(goalNoGoal[i]);
    }
    return {
      goalOdds,
      noGoalOdds,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = goalNoGoalScraper;
