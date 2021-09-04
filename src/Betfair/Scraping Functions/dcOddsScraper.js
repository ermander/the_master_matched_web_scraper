const underOver3_5OddsScraper = async (driver, By, selector) => {
  try {
    const container = await driver.findElement(By.className("markets-wrapper"));
    let odds = await container.findElements(By.className(selector));
    let oneXOdds = [];
    let xTwoOdds = [];
    let oneTwoOdds = [];
    for (let i = 0; i < odds.length; i++) {
      let element = await odds[i].getAttribute("innerText");
      if (i % 2 === 0) {
        oneXOdds.push(element.split("\n")[0]);
        xTwoOdds.push(element.split("\n")[1]);
        oneTwoOdds.push(element.split("\n")[2]);
      }
    }
    oneXOdds = oneXOdds.map((odd) => {
      if (odd === "") odd = "1";
      if (odd === undefined) odd = "1";
      return odd;
    });
    xTwoOdds = xTwoOdds.map((odd) => {
      if (odd === "") odd = "1";
      if (odd === undefined) odd = "1";
      return odd;
    });
    oneTwoOdds = oneTwoOdds.map((odd) => {
      if (odd === "") odd = "1";
      if (odd === undefined) odd = "1";
      return odd;
    });
    return {
      oneXOdds,
      xTwoOdds,
      oneTwoOdds,
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = underOver3_5OddsScraper;
