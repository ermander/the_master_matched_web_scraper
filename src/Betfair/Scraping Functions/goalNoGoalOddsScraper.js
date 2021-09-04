const goalNoGoalOddsScraper = async (driver, By, selector) => {
  try {
    const container = await driver.findElement(By.className("markets-wrapper"));
    let odds = await container.findElements(By.className(selector));
    let goalOdds = [];
    let noGoalOdds = [];
    for (let i = 0; i < odds.length; i++) {
      let element = await odds[i].getAttribute("innerText");
      goalOdds.push(element.split("\n")[0]);
      noGoalOdds.push(element.split("\n")[1]);
    }
    goalOdds = goalOdds.map((odd) => {
      if (odd === "") odd = "1";
      if (odd === undefined) odd = "1";
      return odd;
    });
    noGoalOdds = noGoalOdds.map((odd) => {
      if (odd === "") odd = "1";
      if (odd === undefined) odd = "1";
      return odd;
    });
    return { goalOdds, noGoalOdds };
  } catch (error) {
    console.log(error);
  }
};

module.exports = goalNoGoalOddsScraper;
