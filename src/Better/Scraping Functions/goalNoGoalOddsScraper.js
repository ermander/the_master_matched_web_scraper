const goalNoGoalOddsScraper = async (driver, By, selector) => {
  try {
    let goalOdds = [];
    let noGoalOdds = [];

    const infoes = await driver.findElements(By.className(selector));
    for (let i = 0; i < infoes.length; i++) {
      let container = await infoes[i].getAttribute("innerText");
      if (i % 2 === 0) goalOdds.push(container);
      if (i % 2 === 1) noGoalOdds.push(container);
    }
    return {
      goalOdds,
      noGoalOdds,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = goalNoGoalOddsScraper;
