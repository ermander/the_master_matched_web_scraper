const oddsScraper = async (driver, By, selector) => {
  try {
    let oneOdds = [];
    let xOdds = [];
    let twoOdds = [];
    let under2_5Odds = [];
    let over2_5Odds = [];
    const container = await driver.findElement(By.className("markets-wrapper"));
    let odds = await container.findElements(By.className(selector));
    for (let i = 0; i < odds.length; i++) {
      if (i % 5 === 0)
        over2_5Odds.push(await odds[i].getAttribute("innerText"));
      if (i % 5 === 0)
        under2_5Odds.push(await odds[i].getAttribute("innerText"));
      if (i % 5 === 0) oneOdds.push(await odds[i].getAttribute("innerText"));
      if (i % 5 === 0) xOdds.push(await odds[i].getAttribute("innerText"));
      if (i % 5 === 0) twoOdds.push(await odds[i].getAttribute("innerText"));
    }
    return { oneOdds, xOdds, twoOdds, under2_5Odds, over2_5Odds };
  } catch (error) {
    console.log(error);
  }
};

module.exports = oddsScraper;
